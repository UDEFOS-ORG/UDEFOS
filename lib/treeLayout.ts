import type { TreeNodeSpec } from '@/types/learning';

const COLUMN_WIDTH = 64;
const ROW_HEIGHT = 80;
export const DIAGRAM_PADDING = 36;

export interface LayoutNode {
  label: string;
  x: number;
  y: number;
}

export interface LayoutEdge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface TreeLayout {
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  width: number;
  height: number;
}

export function layoutTree(root: TreeNodeSpec): TreeLayout {
  const nodes: LayoutNode[] = [];
  const edges: LayoutEdge[] = [];
  let leafCount = 0;
  let maxDepth = 0;

  function place(spec: TreeNodeSpec, depth: number): { x: number; y: number } {
    maxDepth = Math.max(maxDepth, depth);
    const y = depth * ROW_HEIGHT;
    const children = spec.children ?? [];
    let x: number;

    if (children.length === 0) {
      x = leafCount * COLUMN_WIDTH;
      leafCount += 1;
    } else {
      const childPositions = children.map((child) => place(child, depth + 1));
      x = (childPositions[0].x + childPositions[childPositions.length - 1].x) / 2;
      childPositions.forEach((child) => edges.push({ x1: x, y1: y, x2: child.x, y2: child.y }));
    }

    nodes.push({ label: spec.label, x, y });
    return { x, y };
  }

  place(root, 0);

  return {
    nodes,
    edges,
    width: Math.max(leafCount - 1, 0) * COLUMN_WIDTH + DIAGRAM_PADDING * 2,
    height: maxDepth * ROW_HEIGHT + DIAGRAM_PADDING * 2,
  };
}
