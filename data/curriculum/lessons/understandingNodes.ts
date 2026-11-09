import type { TopicDefinition } from '@/types/learning';

export const understandingNodes: TopicDefinition = {
  id: 'understanding-nodes',
  title: 'Understanding Nodes',
  description:
    'Look inside a tree. See how each node stores a value, points to its children and connects with the rest of the structure.',
  estimatedMinutes: 25,
  lesson: {
    objectives: [
      'Describe what a node stores',
      'Explain left and right child references',
      'Recognise leaves and nodes with zero, one or two children',
      'Explain how nodes connect to form a whole tree',
    ],
    video: {
      title: 'Inside a node',
      description:
        'A walkthrough of how nodes hold values and references. Captions will appear here once the lesson video is added.',
      src: '/videos/lesson-02.mp4',
      captionsSrc: '/videos/lesson-02.vtt',
    },
    sections: [
      {
        id: 'what-a-node-is',
        heading: 'What a node is',
        paragraphs: [
          'A node is the basic building block of a tree. You can picture it as a labelled box.',
          'Each node stores a value, such as a number or a name, and references to the nodes it connects to. A reference works like an address that says where another node lives.',
        ],
        keyTerms: ['node', 'value', 'reference'],
        diagram: {
          tree: { label: '42' },
          caption: 'A single node holding the value 42.',
        },
        checkpoint: {
          id: 'nodes-s1-check',
          prompt: 'What does a node store?',
          options: [
            'Only its value',
            'Only references to other nodes',
            'A value and references to other nodes',
            'Only the edges that connect it',
          ],
          answerIndex: 2,
          explanation: 'A node holds its value and the references that link it to other nodes.',
        },
      },
      {
        id: 'left-and-right',
        heading: 'Left and right child references',
        paragraphs: [
          'In a binary tree, each node has at most two child references: a left child and a right child.',
          'If a child slot is empty, its reference is set to nothing. Programmers often call this null.',
        ],
        keyTerms: ['left', 'right', 'null'],
        diagram: {
          tree: { label: '50', children: [{ label: '30' }, { label: '70' }] },
          caption: 'Node 50 has a left child, 30, and a right child, 70.',
        },
        checkpoint: {
          id: 'nodes-s2-check',
          prompt: 'Node 30 has no children. What are its left and right references?',
          options: [
            'Both point to nothing (null)',
            'Both point to 50',
            'Left points to 50 and right is empty',
            'Both point to 70',
          ],
          answerIndex: 0,
          explanation: 'A node with no children has both child references empty, which means null.',
        },
      },
      {
        id: 'leaves-and-children',
        heading: 'Leaves, and nodes with zero, one or two children',
        paragraphs: [
          'The number of children a node has tells you its role. A node with zero children is a leaf. A node with one child continues a single chain. A node with two children is a branch point.',
          'Leaves are where a tree ends. In a binary search tree, new values are usually added at a leaf.',
        ],
        keyTerms: ['leaf', 'branch point'],
        diagram: {
          tree: {
            label: '10',
            children: [
              { label: '5', children: [{ label: '2' }] },
              { label: '15', children: [{ label: '12' }, { label: '20' }] },
            ],
          },
          highlight: ['2', '12', '20'],
          caption: 'Leaves 2, 12 and 20 have no children. Node 5 has one child. Node 15 has two.',
        },
        checkpoint: {
          id: 'nodes-s3-check',
          prompt: 'How many children does node 15 have in the diagram?',
          options: ['0', '1', '2', '3'],
          answerIndex: 2,
          explanation: 'Node 15 has two children, 12 and 20, so it is a branch point.',
        },
      },
      {
        id: 'how-nodes-connect',
        heading: 'How nodes connect to form a tree',
        paragraphs: [
          'A tree is entered through one starting point: the root node. If you know the root, you can follow the references to reach every other node.',
          'Every node is reached by exactly one path from the root. If the root reference is empty, the tree has no nodes at all. This is called an empty tree.',
        ],
        keyTerms: ['empty tree', 'root'],
        checkpoint: {
          id: 'nodes-s4-check',
          prompt: 'A program has no root node at all. What kind of tree is it?',
          options: ['A single leaf', 'An empty tree', 'A broken tree that must be fixed', 'A tree whose root is zero'],
          answerIndex: 1,
          explanation: 'With no root, there are no nodes, so the tree is empty.',
        },
      },
    ],
  },
  quiz: [
    {
      id: 'nodes-q1',
      prompt: 'Which part of a node tells the program where a connected node is?',
      options: ['Its value', 'Its reference', 'Its colour', 'Its depth'],
      answerIndex: 1,
      explanation: 'A reference points to another node, so the program can follow it.',
    },
    {
      id: 'nodes-q2',
      prompt: 'A leaf node has at least one child.',
      options: ['True', 'False'],
      answerIndex: 1,
      explanation: 'A leaf has no children at all.',
    },
    {
      id: 'nodes-q3',
      scenario: 'Node 8 has a left child, 3, and a right child, 12.',
      prompt: 'How many children does node 8 have?',
      options: ['0', '1', '2', '3'],
      answerIndex: 2,
      explanation: 'Node 8 has two children, so it is a branch point.',
    },
    {
      id: 'nodes-q4',
      scenario: 'Your program loads a tree whose root reference is null.',
      prompt: 'What does this tree contain?',
      options: ['Nothing: it is an empty tree', 'One node with the value null', 'Two nodes', 'It cannot be loaded'],
      answerIndex: 0,
      explanation: 'A null root means there is no starting node, so the tree is empty.',
    },
    {
      id: 'nodes-q5',
      prompt: 'What is a node called when both of its child references are null?',
      options: ['A leaf', 'A branch point', 'A parent with one child', 'An edge'],
      answerIndex: 0,
      explanation: 'A node with no children is a leaf.',
    },
  ],
};
