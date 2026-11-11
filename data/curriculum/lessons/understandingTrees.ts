import type { TopicDefinition } from '@/types/learning';

export const understandingTrees: TopicDefinition = {
  id: 'understanding-trees',
  title: 'Understanding Trees',
  description:
    'Discover why data is organised into structures, and learn the vocabulary of trees: roots, parents, children, leaves, levels, depth and height.',
  estimatedMinutes: 20,
  lesson: {
    objectives: [
      'Explain the difference between linear and hierarchical structures',
      'Name the parts of a tree: root, parent, child, sibling and leaf',
      'Describe levels, edges, depth and height',
    ],
    video: {
      title: 'Trees in everyday life',
      description:
        'A short tour of hierarchical structures you already use, from family trees to folder systems. Captions will appear here once the lesson video is added.',
      src: '/videos/lesson-01.mp4',
      captionsSrc: '/videos/lesson-01.vtt',
    },
    sections: [
      {
        id: 'data-and-algorithms',
        heading: 'Data, data structures and algorithms',
        paragraphs: [
          'Data is any raw information, such as a number, a name or a date. On its own, a list of a thousand names is slow to search.',
          'A data structure is a way of arranging data so it can be used efficiently. An algorithm is a clear set of steps that does a job, such as finding a name or sorting a list.',
          'Think of a library. The books are the data, the catalogue is the data structure, and the steps a librarian follows to find a book are the algorithm.',
        ],
        keyTerms: ['data structure', 'algorithm', 'data'],
        checkpoint: {
          id: 'trees-s1-check',
          prompt: 'Which of these is an algorithm?',
          options: [
            'A list of customer names',
            'A set of steps for sorting numbers from smallest to largest',
            'The number 42',
            'A folder on your computer',
          ],
          answerIndex: 1,
          explanation:
            'An algorithm is a set of steps that solves a problem. A list, a number and a folder are things that hold data.',
        },
      },
      {
        id: 'linear-and-hierarchical',
        heading: 'Linear and hierarchical structures',
        paragraphs: [
          'A linear structure arranges items one after another, like songs in a playlist or people in a queue. Each item has one item before it and one after it.',
          'A hierarchical structure arranges items in levels, with some items sitting under others. A company chart is hierarchical, and so are the folders on your computer.',
          'Hierarchical structures are the foundation of trees.',
        ],
        keyTerms: ['linear', 'hierarchical'],
        diagram: {
          tree: {
            label: 'CEO',
            children: [
              { label: 'Sales' },
              { label: 'Dev', children: [{ label: 'Web' }, { label: 'Data' }] },
            ],
          },
          highlight: ['Dev'],
          caption: 'A company chart is a tree: each team reports to one manager above it.',
        },
        checkpoint: {
          id: 'trees-s2-check',
          prompt: 'A playlist that plays songs one after another is which kind of structure?',
          options: ['Hierarchical', 'Linear', 'Circular', 'Random'],
          answerIndex: 1,
          explanation: 'Items that follow one another in a single sequence form a linear structure.',
        },
      },
      {
        id: 'what-a-tree-is',
        heading: 'What a tree is and why it is useful',
        paragraphs: [
          'A tree is a collection of nodes connected by lines called edges. Each node holds a value, and connected nodes form parent and child pairs.',
          'A tree has exactly one top node, called the root, and it never loops back on itself.',
          'Trees are useful because they show hierarchy clearly, and they let a computer move from the top to any item without checking every item in turn.',
        ],
        keyTerms: ['tree', 'node', 'edge', 'root'],
        checkpoint: {
          id: 'trees-s3-check',
          prompt: 'Which statement describes a tree correctly?',
          options: [
            'Every node is connected to every other node',
            'It has one root, and nodes connect parent to child without loops',
            'Each item has exactly one item before it',
            'It can only store numbers',
          ],
          answerIndex: 1,
          explanation: 'A tree has one root and links nodes from parent to child. It never loops back.',
        },
      },
      {
        id: 'tree-vocabulary',
        heading: 'Roots, parents, children, siblings, leaves, levels, depth and height',
        paragraphs: [
          'The root is the top node. A parent is a node with children below it, and a child is a node directly below its parent. Nodes that share the same parent are siblings.',
          'A leaf is a node with no children. Levels count down from the root, which is level 0. Depth is the number of edges from the root to a node. Height is the number of edges on the longest path from the root down to a leaf.',
        ],
        keyTerms: ['root', 'parent', 'child', 'sibling', 'leaf', 'level', 'depth', 'height', 'edge'],
        diagram: {
          tree: {
            label: 'A',
            children: [
              { label: 'B', children: [{ label: 'D' }, { label: 'E' }] },
              { label: 'C' },
            ],
          },
          highlight: ['A'],
          caption: 'The root is A. B and C are its children, and D, E and C are leaves. The height is 2.',
        },
        checkpoint: {
          id: 'trees-s4-check',
          prompt: 'In the diagram, what is the height of the tree?',
          options: ['1', '2', '3', '5'],
          answerIndex: 1,
          explanation: 'The longest path runs from A to B to D, which has two edges, so the height is 2.',
        },
      },
    ],
  },
  quiz: [
    {
      id: 'trees-q1',
      prompt: 'Which of these is a hierarchical structure?',
      options: ['A queue at a bus stop', 'A family tree', 'A list of shopping items', 'Books in a row on a shelf'],
      answerIndex: 1,
      explanation: 'A family tree places people in levels, with parents above their children.',
    },
    {
      id: 'trees-q2',
      prompt: 'A tree can have more than one root.',
      options: ['True', 'False'],
      answerIndex: 1,
      explanation: 'A tree has exactly one root.',
    },
    {
      id: 'trees-q3',
      scenario: 'A website menu has Home at the top, then Products, which has Shoes and Hats under it.',
      prompt: 'In this menu, what is the parent of Shoes?',
      options: ['Home', 'Products', 'Hats', 'Shoes has no parent'],
      answerIndex: 1,
      explanation: 'Shoes sits directly below Products, so Products is its parent.',
    },
    {
      id: 'trees-q4',
      prompt: 'What do we call a node that has no children?',
      options: ['Root', 'Leaf', 'Edge', 'Sibling'],
      answerIndex: 1,
      explanation: 'A node with no children is a leaf.',
    },
    {
      id: 'trees-q5',
      scenario:
        'Ana draws a tree with a top node that has three children. One of those children has two children of its own.',
      prompt: 'What is the height of this tree?',
      options: ['1', '2', '3', '4'],
      answerIndex: 1,
      explanation: 'The longest path goes from the top node to a child to a grandchild, which is two edges.',
    },
  ],
};
