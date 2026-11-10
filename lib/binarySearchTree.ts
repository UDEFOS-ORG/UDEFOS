export interface BstNode {
  value: number;
  height: number;
  left: BstNode | null;
  right: BstNode | null;
}

export interface SearchResult {
  found: boolean;
  path: number[];
}

export interface LayoutNode {
  value: number;
  column: number;
  row: number;
}

export interface LayoutEdge {
  from: LayoutNode;
  to: LayoutNode;
}

export interface TreeLayout {
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  columns: number;
  rows: number;
}

function heightOf(node: BstNode | null): number {
  return node ? node.height : 0;
}

function makeNode(value: number, left: BstNode | null, right: BstNode | null): BstNode {
  return { value, left, right, height: 1 + Math.max(heightOf(left), heightOf(right)) };
}

function balanceFactor(node: BstNode): number {
  return heightOf(node.left) - heightOf(node.right);
}

function rotateRight(node: BstNode, pivot: BstNode): BstNode {
  return makeNode(pivot.value, pivot.left, makeNode(node.value, pivot.right, node.right));
}

function rotateLeft(node: BstNode, pivot: BstNode): BstNode {
  return makeNode(pivot.value, makeNode(node.value, node.left, pivot.left), pivot.right);
}

function rebalance(node: BstNode): BstNode {
  const factor = balanceFactor(node);
  if (factor > 1 && node.left) {
    const left = balanceFactor(node.left) < 0 && node.left.right ? rotateLeft(node.left, node.left.right) : node.left;
    return rotateRight(makeNode(node.value, left, node.right), left);
  }
  if (factor < -1 && node.right) {
    const right = balanceFactor(node.right) > 0 && node.right.left ? rotateRight(node.right, node.right.left) : node.right;
    return rotateLeft(makeNode(node.value, node.left, right), right);
  }
  return node;
}

export function insertValue(root: BstNode | null, value: number): BstNode {
  if (!root) return makeNode(value, null, null);
  if (value === root.value) return root;
  if (value < root.value) return rebalance(makeNode(root.value, insertValue(root.left, value), root.right));
  return rebalance(makeNode(root.value, root.left, insertValue(root.right, value)));
}

export function removeValue(root: BstNode | null, value: number): BstNode | null {
  if (!root) return null;
  if (value < root.value) return rebalance(makeNode(root.value, removeValue(root.left, value), root.right));
  if (value > root.value) return rebalance(makeNode(root.value, root.left, removeValue(root.right, value)));
  if (!root.left) return root.right;
  if (!root.right) return root.left;
  const successor = smallestValue(root.right);
  return rebalance(makeNode(successor, root.left, removeValue(root.right, successor)));
}

export function searchValue(root: BstNode | null, value: number): SearchResult {
  const path: number[] = [];
  let current = root;
  while (current) {
    path.push(current.value);
    if (value === current.value) return { found: true, path };
    current = value < current.value ? current.left : current.right;
  }
  return { found: false, path };
}

export function buildTree(values: number[]): BstNode | null {
  return values.reduce<BstNode | null>((tree, value) => insertValue(tree, value), null);
}

export function inOrderValues(root: BstNode | null): number[] {
  if (!root) return [];
  return [...inOrderValues(root.left), root.value, ...inOrderValues(root.right)];
}

export function countNodes(root: BstNode | null): number {
  return root ? 1 + countNodes(root.left) + countNodes(root.right) : 0;
}

export function treeHeight(root: BstNode | null): number {
  return heightOf(root);
}

function smallestValue(node: BstNode): number {
  let current = node;
  while (current.left) current = current.left;
  return current.value;
}

export function layoutTree(root: BstNode | null): TreeLayout {
  const nodes: LayoutNode[] = [];
  const edges: LayoutEdge[] = [];
  let column = 0;
  let rows = 0;

  function place(node: BstNode | null, row: number): LayoutNode | null {
    if (!node) return null;
    rows = Math.max(rows, row + 1);
    const left = place(node.left, row + 1);
    const current: LayoutNode = { value: node.value, column, row };
    column += 1;
    nodes.push(current);
    const right = place(node.right, row + 1);
    if (left) edges.push({ from: current, to: left });
    if (right) edges.push({ from: current, to: right });
    return current;
  }

  place(root, 0);

  return { nodes, edges, columns: column, rows };
}
