'use client';

import { Box, Typography } from '@mui/material';
import type { BstNode, LayoutNode } from '@/lib/binarySearchTree';
import { layoutTree } from '@/lib/binarySearchTree';

const COLUMN_SPACING = 56;
const ROW_SPACING = 80;
const PADDING = 32;
const NODE_RADIUS = 22;

export type HighlightTone = 'visited' | 'success' | 'warning';

export interface Highlight {
  path: number[];
  target: number | null;
  tone: HighlightTone;
}

interface BstTreeViewProps {
  root: BstNode | null;
  highlight: Highlight | null;
}

const TONE_FILL: Record<HighlightTone, string> = {
  visited: '#F59E0B',
  success: '#2E7D32',
  warning: '#DC2626',
};

const TONE_STROKE: Record<HighlightTone, string> = {
  visited: '#B45309',
  success: '#14532D',
  warning: '#7F1D1D',
};

const TONE_TEXT: Record<HighlightTone, string> = {
  visited: '#0F1B2D',
  success: '#FFFFFF',
  warning: '#FFFFFF',
};

export default function BstTreeView({ root, highlight }: BstTreeViewProps) {
  const layout = layoutTree(root);
  const width = Math.max(layout.columns, 1) * COLUMN_SPACING + PADDING * 2;
  const height = Math.max(layout.rows, 1) * ROW_SPACING + PADDING * 2;
  const pathValues = new Set(highlight?.path ?? []);

  const position = (node: LayoutNode) => ({
    x: node.column * COLUMN_SPACING + PADDING,
    y: node.row * ROW_SPACING + PADDING,
  });

  const styleFor = (value: number) => {
    if (highlight && value === highlight.target) {
      return { fill: TONE_FILL[highlight.tone], stroke: TONE_STROKE[highlight.tone], text: TONE_TEXT[highlight.tone] };
    }
    if (pathValues.has(value)) {
      return { fill: TONE_FILL.visited, stroke: TONE_STROKE.visited, text: TONE_TEXT.visited };
    }
    return { fill: '#FFFFFF', stroke: '#1456A3', text: '#0F1B2D' };
  };

  if (!root) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          The tree is empty. Add a number to start building it.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ overflowX: 'auto', width: '100%', py: 1 }}>
      <Box
        component="svg"
        role="img"
        aria-label={`Binary search tree with ${layout.nodes.length} nodes`}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        sx={{ display: 'block', mx: 'auto', minWidth: width }}
      >
        {layout.edges.map((edge) => {
          const from = position(edge.from);
          const to = position(edge.to);
          const onPath = pathValues.has(edge.from.value) && pathValues.has(edge.to.value);
          return (
            <line
              key={`${edge.from.value}-${edge.to.value}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={onPath ? TONE_STROKE.visited : '#9AA8BA'}
              strokeWidth={onPath ? 4 : 2}
            />
          );
        })}
        {layout.nodes.map((node) => {
          const { x, y } = position(node);
          const style = styleFor(node.value);
          return (
            <g key={node.value} transform={`translate(${x} ${y})`}>
              <circle r={NODE_RADIUS} fill={style.fill} stroke={style.stroke} strokeWidth={2.5} />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={14}
                fontWeight={600}
                fill={style.text}
              >
                {node.value}
              </text>
            </g>
          );
        })}
      </Box>
    </Box>
  );
}
