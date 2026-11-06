'use client';

import { Box, Typography } from '@mui/material';
import { DIAGRAM_PADDING, layoutTree } from '@/lib/treeLayout';
import type { DiagramSpec } from '@/types/learning';

const NODE_RADIUS = 22;
const BRAND = '#1456A3';
const INK = '#0F1B2D';

interface TreeDiagramProps {
  diagram: DiagramSpec;
}

export default function TreeDiagram({ diagram }: TreeDiagramProps) {
  const layout = layoutTree(diagram.tree);
  const highlighted = new Set(diagram.highlight ?? []);

  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Box
        component="svg"
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        role="img"
        aria-label={diagram.caption}
        sx={{ width: '100%', maxWidth: 480, height: 'auto', display: 'block', mx: 'auto' }}
      >
        {layout.edges.map((edge) => (
          <line
            key={`${edge.x1}-${edge.y1}-${edge.x2}-${edge.y2}`}
            x1={edge.x1 + DIAGRAM_PADDING}
            y1={edge.y1 + DIAGRAM_PADDING}
            x2={edge.x2 + DIAGRAM_PADDING}
            y2={edge.y2 + DIAGRAM_PADDING}
            stroke="#9AA8BA"
            strokeWidth={2}
          />
        ))}
        {layout.nodes.map((node) => {
          const isHighlighted = highlighted.has(node.label);
          return (
            <g key={node.label} transform={`translate(${node.x + DIAGRAM_PADDING} ${node.y + DIAGRAM_PADDING})`}>
              <circle
                r={NODE_RADIUS}
                fill={isHighlighted ? BRAND : '#FFFFFF'}
                stroke={BRAND}
                strokeWidth={2}
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={14}
                fontWeight={isHighlighted ? 700 : 600}
                fill={isHighlighted ? '#FFFFFF' : INK}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </Box>
      <Typography component="figcaption" variant="body2" color="text.secondary" sx={{ mt: 1.5, textAlign: 'center' }}>
        {diagram.caption}
      </Typography>
    </Box>
  );
}
