import type { TopicDefinition } from '@/types/learning';

export const bstSearch: TopicDefinition = {
  id: 'bst-search',
  title: 'Binary Search Tree: Search Algorithm',
  description:
    'Learn how a binary search tree organises data so that a value can be found quickly, and trace the search algorithm step by step using the ordered property of the tree.',
  estimatedMinutes: 20,
  lesson: {
    objectives: [
      'Explain what makes a binary tree a binary search tree',
      'Describe the ordered property that makes searching fast',
      'Trace the search algorithm through a binary search tree',
      'Compare searching in a binary search tree with searching a list',
    ],
    video: {
      title: 'Finding a value in a binary search tree',
      description:
        'A short walkthrough of how a search narrows down a binary search tree one comparison at a time. Captions will appear here once the lesson video is added.',
      src: '/videos/lesson-03.mp4',
    },
    sections: [
      {
        id: 'recap-trees',
        heading: 'Recap: trees and nodes',
        paragraphs: [
          'A tree is a collection of nodes connected by edges. Each node holds a value, and nodes connect in parent and child pairs, with exactly one root at the top and no loops.',
          'A binary tree is a tree where each node has at most two children, usually called the left child and the right child.',
          'A binary tree is the starting point for the binary search tree. The extra rule that turns it into a search tree is the key to fast searching.',
        ],
        keyTerms: ['tree', 'node', 'edge', 'root', 'binary tree', 'left child', 'right child'],
        checkpoint: {
          id: 'bst-s1-check',
          prompt: 'What is a binary tree?',
          options: [
            'A tree where every node has exactly two children',
            'A tree where each node has at most two children',
            'A tree with exactly two roots',
            'A tree that stores only two values',
          ],
          answerIndex: 1,
          explanation:
            'Each node in a binary tree has at most two children, a left child and a right child. Some nodes may have one or none.',
        },
      },
      {
        id: 'ordered-property',
        heading: 'The binary search tree rule',
        paragraphs: [
          'A binary search tree (BST) is a binary tree with an ordering rule. For every node, all values in its left subtree are smaller than the node, and all values in its right subtree are larger than the node.',
          'The rule applies to every node, not just the root. This means the whole tree stays sorted in a predictable way.',
          'Because of this rule, you never need to check every value. At each node you know which side a target must be on, so you can ignore the other side completely.',
        ],
        keyTerms: ['binary search tree', 'left subtree', 'right subtree', 'ordered property'],
        diagram: {
          tree: {
            label: '8',
            children: [
              {
                label: '3',
                children: [{ label: '1' }, { label: '6' }],
              },
              {
                label: '10',
                children: [{ label: '9' }, { label: '14' }],
              },
            ],
          },
          highlight: ['8'],
          caption:
            'A binary search tree. Everything left of 8 is smaller than 8, everything right is larger. The same rule holds for 3 and 10.',
        },
        checkpoint: {
          id: 'bst-s2-check',
          prompt: 'In a binary search tree, where do values smaller than a node go?',
          options: [
            'In the right subtree',
            'In the left subtree',
            'At the root',
            'They can go anywhere',
          ],
          answerIndex: 1,
          explanation:
            'The ordered property places smaller values in the left subtree and larger values in the right subtree.',
        },
      },
      {
        id: 'search-algorithm',
        heading: 'The search algorithm',
        paragraphs: [
          'Searching a binary search tree for a target value starts at the root. Compare the target with the current node.',
          'If the target equals the node, you have found it. If the target is smaller, move to the left child and repeat. If the target is larger, move to the right child and repeat.',
          'If you reach a node with no child on the side you need, the value is not in the tree. Each step throws away a whole subtree, so the search finishes quickly.',
        ],
        keyTerms: ['search', 'compare', 'target', 'current node'],
        diagram: {
          tree: {
            label: '8',
            children: [
              {
                label: '3',
                children: [{ label: '1' }, { label: '6' }],
              },
              {
                label: '10',
                children: [{ label: '9' }, { label: '14' }],
              },
            ],
          },
          highlight: ['8', '10', '9'],
          caption:
            'Searching for 9: start at 8 (9 > 8, go right), then 10 (9 < 10, go left), then find 9.',
        },
        checkpoint: {
          id: 'bst-s3-check',
          prompt: 'At a node, the target is larger than the node value. Where do you look next?',
          options: [
            'The left child',
            'The right child',
            'The parent',
            'Start again from the root',
          ],
          answerIndex: 1,
          explanation:
            'Larger values are stored in the right subtree, so you move to the right child.',
        },
      },
      {
        id: 'worked-example',
        heading: 'A worked example',
        paragraphs: [
          'Take the tree with root 8. Its left child is 3 (with children 1 and 6), and its right child is 10 (with children 9 and 14).',
          'Search for 6. Compare with 8: 6 is smaller, go left to 3. Compare with 3: 6 is larger, go right to 6. The value matches, so it is found in three comparisons.',
          'Search for 7. Compare with 8: go left to 3. Compare with 3: go right to 6. Compare with 6: 7 is larger, but 6 has no right child, so 7 is not in the tree.',
        ],
        keyTerms: ['comparison', 'path', 'found', 'not found'],
        checkpoint: {
          id: 'bst-s4-check',
          prompt:
            'In the tree with root 8, how many comparisons does it take to find the value 1?',
          options: ['1', '2', '3', '4'],
          answerIndex: 2,
          explanation:
            'Compare with 8 (go left), compare with 3 (go left), compare with 1 (found). That is three comparisons.',
        },
      },
    ],
  },
  quiz: [
    {
      id: 'bst-q1',
      prompt: 'Which statement describes the ordered property of a binary search tree?',
      options: [
        'Every node has exactly two children',
        'Left subtree values are smaller than the node and right subtree values are larger',
        'Values are stored in the order they are inserted',
        'All leaves are on the same level',
      ],
      answerIndex: 1,
      explanation:
        'The ordered property says smaller values go left and larger values go right, at every node.',
    },
    {
      id: 'bst-q2',
      prompt: 'Searching a binary search tree always needs to check every node.',
      options: ['True', 'False'],
      answerIndex: 1,
      explanation:
        'Each comparison rules out one whole subtree, so only a single path from the root is followed.',
    },
    {
      id: 'bst-q3',
      scenario:
        'A binary search tree has root 20, with left child 10 and right child 30. The node 10 has a right child 15.',
      prompt: 'When searching for 15, which nodes are compared in order?',
      options: [
        '20, 10, 15',
        '20, 30, 15',
        '10, 15, 20',
        '20, 15, 10',
      ],
      answerIndex: 0,
      explanation:
        '15 < 20 so go left to 10; 15 > 10 so go right to 15. The path is 20, 10, 15.',
    },
    {
      id: 'bst-q4',
      prompt: 'You reach a node and need to go right, but it has no right child. What does this mean?',
      options: [
        'The target is the current node',
        'The target is not in the tree',
        'You should go left instead',
        'The tree is invalid',
      ],
      answerIndex: 1,
      explanation:
        'If the side you need is empty, the value cannot be in the tree and the search ends as not found.',
    },
    {
      id: 'bst-q5',
      scenario:
        'A binary search tree contains the values 1 to 15 arranged so each search follows a short path from the root.',
      prompt: 'Why is searching this tree usually faster than searching a sorted list of the same values?',
      options: [
        'The tree stores fewer values',
        'Each comparison discards a whole subtree, so fewer values are checked',
        'The tree keeps values in insertion order',
        'Lists cannot be searched at all',
      ],
      answerIndex: 1,
      explanation:
        'A binary search tree narrows the search to one subtree at each step, so far fewer comparisons are needed than checking a list item by item.',
    },
  ],
};