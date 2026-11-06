import type { TopicId } from '@/types/learning';

export interface GlossaryTerm {
  term: string;
  definition: string;
  example?: string;
  topicId?: TopicId;
}

export const GLOSSARY_TERMS: readonly GlossaryTerm[] = [
  {
    term: 'Algorithm',
    definition: 'A clear set of steps that solves a problem or completes a job.',
    example: 'The steps for sorting a list from smallest to largest.',
    topicId: 'understanding-trees',
  },
  {
    term: 'Balanced tree',
    definition: 'A tree whose nodes are spread across levels, so it is short and wide.',
    example: 'A tree built from 2, 1, 3 is balanced; one built from 1, 2, 3 is not.',
  },
  {
    term: 'Binary search tree',
    definition:
      'A binary tree where every value in a left subtree is smaller than its node and every value in a right subtree is larger.',
  },
  {
    term: 'Binary tree',
    definition: 'A tree in which every node has at most two children, a left child and a right child.',
    topicId: 'understanding-nodes',
  },
  {
    term: 'Branch point',
    definition: 'A node that has two children.',
    topicId: 'understanding-nodes',
  },
  {
    term: 'Child',
    definition: 'A node directly below another node, connected to it by an edge.',
    topicId: 'understanding-trees',
  },
  {
    term: 'Data',
    definition: 'Raw information such as numbers, names or dates.',
    topicId: 'understanding-trees',
  },
  {
    term: 'Data structure',
    definition: 'A way of arranging data so that it can be used efficiently.',
    topicId: 'understanding-trees',
  },
  {
    term: 'Depth',
    definition: 'The number of edges from the root down to a particular node.',
    topicId: 'understanding-trees',
  },
  {
    term: 'Duplicate',
    definition:
      'A value that is already stored in the tree. This app ignores duplicates, so each value is stored once.',
  },
  {
    term: 'Edge',
    definition: 'A line that connects a parent node to a child node.',
    topicId: 'understanding-trees',
  },
  {
    term: 'Empty tree',
    definition: 'A tree with no nodes at all. Its root reference is null.',
    topicId: 'understanding-nodes',
  },
  {
    term: 'Hierarchical structure',
    definition: 'Items arranged in levels, where some items sit under others.',
    example: 'A company chart or a folder system on your computer.',
    topicId: 'understanding-trees',
  },
  {
    term: 'Height',
    definition: 'The number of edges on the longest path from the root down to a leaf.',
    topicId: 'understanding-trees',
  },
  {
    term: 'Insertion',
    definition:
      'Adding a new value to a binary search tree by comparing it at each node and moving left or right until an empty spot is found.',
  },
  {
    term: 'Leaf',
    definition: 'A node with no children.',
    topicId: 'understanding-trees',
  },
  {
    term: 'Level',
    definition: 'A row of nodes at the same distance from the root. The root is level 0.',
    topicId: 'understanding-trees',
  },
  {
    term: 'Linear structure',
    definition: 'Items arranged one after another, with one item before and one item after.',
    example: 'A playlist of songs or a queue at a bus stop.',
    topicId: 'understanding-trees',
  },
  {
    term: 'Node',
    definition: 'The basic building block of a tree. It stores a value and references to the nodes it connects to.',
    topicId: 'understanding-nodes',
  },
  {
    term: 'Null',
    definition: 'A reference that points to nothing. An empty child slot holds null.',
    topicId: 'understanding-nodes',
  },
  {
    term: 'O(log n)',
    definition:
      'Time that grows very slowly as the data grows: each step halves the remaining options, so doubling the data adds only one step.',
  },
  {
    term: 'O(n)',
    definition: 'Time that grows in step with the number of values, because you may check every item.',
  },
  {
    term: 'Parent',
    definition: 'A node that has one or more children below it.',
    topicId: 'understanding-trees',
  },
  {
    term: 'Reference',
    definition: 'A stored address that tells the program where another node is.',
    topicId: 'understanding-nodes',
  },
  {
    term: 'Root',
    definition: 'The single top node of a tree. Every other node is reached from it.',
    topicId: 'understanding-trees',
  },
  {
    term: 'Search',
    definition: 'Checking whether a value exists in a structure and, if it does, finding where it is.',
  },
  {
    term: 'Sibling',
    definition: 'Two nodes that share the same parent.',
    topicId: 'understanding-trees',
  },
  {
    term: 'Subtree',
    definition: 'A node together with everything below it.',
  },
  {
    term: 'Time complexity',
    definition: 'A description of how the number of steps grows as the amount of data grows.',
  },
  {
    term: 'Tree',
    definition:
      'A collection of nodes connected by edges, with exactly one root and no loops. Each node has a parent except the root.',
    topicId: 'understanding-trees',
  },
  {
    term: 'Unbalanced tree',
    definition: 'A lopsided tree that behaves more like a list, so searching it takes longer.',
  },
];
