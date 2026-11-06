import { Box } from '@mui/material';
import type { ReactNode } from 'react';

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

interface HighlightedTextProps {
  text: string;
  terms: string[];
}

export default function HighlightedText({ text, terms }: HighlightedTextProps) {
  if (terms.length === 0) return <>{text}</>;

  const ordered = [...terms].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${ordered.map(escapeRegExp).join('|')})`, 'gi');
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index): ReactNode => {
        if (index % 2 === 0) return part;
        return (
          <Box
            key={index}
            component="mark"
            sx={{ bgcolor: 'rgba(245, 158, 11, 0.28)', color: 'inherit', fontWeight: 600, px: 0.5, borderRadius: 1 }}
          >
            {part}
          </Box>
        );
      })}
    </>
  );
}
