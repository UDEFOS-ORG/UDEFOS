'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Box, Button, Chip, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import MenuBookRounded from '@mui/icons-material/MenuBookRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import PageHeader from '@/components/layout/PageHeader';
import { GLOSSARY_TERMS, type GlossaryTerm } from '@/data/curriculum/glossary';
import { TOPICS } from '@/data/curriculum/topics';

function groupByLetter(terms: readonly GlossaryTerm[]): [string, GlossaryTerm[]][] {
  const groups = new Map<string, GlossaryTerm[]>();
  for (const entry of terms) {
    const letter = entry.term[0].toUpperCase();
    groups.set(letter, [...(groups.get(letter) ?? []), entry]);
  }
  return Array.from(groups.entries());
}

export default function GlossaryPage() {
  const [query, setQuery] = useState('');

  const visibleTerms = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const sorted = [...GLOSSARY_TERMS].sort((a, b) => a.term.localeCompare(b.term));
    if (!needle) return sorted;
    return sorted.filter(
      (entry) =>
        entry.term.toLowerCase().includes(needle) ||
        entry.definition.toLowerCase().includes(needle) ||
        (entry.example?.toLowerCase().includes(needle) ?? false),
    );
  }, [query]);

  const groups = useMemo(() => groupByLetter(visibleTerms), [visibleTerms]);

  return (
    <>
      <PageHeader
        eyebrow="Glossary"
        title="Words you will meet"
        description="Plain-language meanings for every term in the lessons. Search by word or by idea."
      />

      <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, mb: 3 }}>
        <TextField
          fullWidth
          type="search"
          label="Search the glossary"
          placeholder="For example: leaf, depth, smaller"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Typography role="status" aria-live="polite" variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
          {visibleTerms.length} {visibleTerms.length === 1 ? 'term' : 'terms'} shown
        </Typography>
      </Paper>

      {groups.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
          <MenuBookRounded color="disabled" sx={{ fontSize: 48 }} aria-hidden />
          <Typography variant="h6" component="h2" sx={{ mt: 1 }}>
            No terms match “{query.trim()}”
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Try a shorter word, or clear the search to see every term.
          </Typography>
          <Button onClick={() => setQuery('')} sx={{ mt: 2 }}>
            Clear search
          </Button>
        </Paper>
      ) : (
        <Stack spacing={4}>
          {groups.map(([letter, entries]) => (
            <Box key={letter} component="section" aria-labelledby={`glossary-${letter}`}>
              <Typography id={`glossary-${letter}`} component="h2" variant="h5" color="primary.main" sx={{ mb: 1.5 }}>
                {letter}
              </Typography>
              <Box
                component="dl"
                sx={{ m: 0, display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' } }}
              >
                {entries.map((entry) => (
                  <Paper
                    key={entry.term}
                    variant="outlined"
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      transition: 'border-color 200ms ease',
                      '&:hover': { borderColor: 'primary.light' },
                      '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                    }}
                  >
                    <Typography component="dt" variant="h6" sx={{ fontSize: '1.05rem' }}>
                      {entry.term}
                    </Typography>
                    <Typography component="dd" variant="body2" color="text.secondary" sx={{ m: 0, lineHeight: 1.5 }}>
                      {entry.definition}
                    </Typography>
                    {entry.example && (
                      <Typography component="dd" variant="body2" sx={{ m: 0, color: 'text.primary', lineHeight: 1.5 }}>
                        <strong>Example:</strong> {entry.example}
                      </Typography>
                    )}
                    {entry.topicId && <RelatedLesson topicId={entry.topicId} />}
                  </Paper>
                ))}
              </Box>
            </Box>
          ))}
        </Stack>
      )}
    </>
  );
}

function RelatedLesson({ topicId }: { topicId: NonNullable<GlossaryTerm['topicId']> }) {
  const topic = TOPICS.find((item) => item.id === topicId);
  if (!topic) return null;

  return (
    <Box sx={{ mt: 'auto', pt: 1 }}>
      <Chip
        component={Link}
        href={`/lessons/${topic.id}`}
        clickable
        size="small"
        variant="outlined"
        color="primary"
        label={`Learn in ${topic.title}`}
        aria-label={`Learn this term in the ${topic.title} lesson`}
      />
    </Box>
  );
}
