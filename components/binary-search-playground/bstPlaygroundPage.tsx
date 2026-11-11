'use client';

import { useState } from 'react';
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import AddRounded from '@mui/icons-material/AddRounded';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import FormatListNumberedRounded from '@mui/icons-material/FormatListNumberedRounded';
import LayersRounded from '@mui/icons-material/LayersRounded';
import RestartAltRounded from '@mui/icons-material/RestartAltRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import PageHeader from '@/components/layout/PageHeader';
import StatTile from '@/components/layout/StatTile';
import BstStepsGuide from '@/components/binary-search-playground/bstStepsGuide';
import BstTreeView, { type Highlight } from '@/components/binary-search-playground/bstTreeView';
import {
  buildTree,
  countNodes,
  inOrderValues,
  insertValue,
  removeValue,
  searchValue,
  treeHeight,
  type BstNode,
} from '@/lib/binarySearchTree';

const SAMPLE_VALUES = [50, 30, 70, 20, 40, 60, 80];
const MAX_VALUE = 99;
const MIN_VALUE = -99;
const MAX_NODES = 31;

type MessageTone = 'info' | 'success' | 'error';

interface Message {
  tone: MessageTone;
  text: string;
}

function parseValue(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === '') return null;
  const parsed = Number(trimmed);
  if (!Number.isInteger(parsed) || parsed < MIN_VALUE || parsed > MAX_VALUE) return null;
  return parsed;
}

export default function BstPlaygroundPage() {
  const [root, setRoot] = useState<BstNode | null>(() => buildTree(SAMPLE_VALUES));
  const [input, setInput] = useState('');
  const [highlight, setHighlight] = useState<Highlight | null>(null);
  const [lastChange, setLastChange] = useState<TreeChange | null>(null);
  const [message, setMessage] = useState<Message>({
    tone: 'info',
    text: 'Every number starts at the top. Smaller numbers go left, larger numbers go right.',
  });

  const changeTree = (action: TreeAction, changedValue: number, next: BstNode | null) => {
    setLastChange({ action, value: changedValue, before: root, after: next });
    setRoot(next);
  };

  const sortedValues = inOrderValues(root);
  const nodeCount = countNodes(root);
  const height = treeHeight(root);
  const value = parseValue(input);
  const inputInvalid = input.trim() !== '' && value === null;

  const invalidMessage = `Enter a whole number from ${MIN_VALUE} to ${MAX_VALUE}.`;

  const handleInsert = () => {
    if (value === null) {
      setMessage({ tone: 'error', text: invalidMessage });
      return;
    }
    const { found, path } = searchValue(root, value);
    if (found) {
      setHighlight({ path, target: value, tone: 'warning' });
      setMessage({ tone: 'error', text: `${value} is already in the tree, so it was not added.` });
      return;
    }
    if (nodeCount >= MAX_NODES) {
      setMessage({ tone: 'error', text: `The playground holds up to ${MAX_NODES} numbers. Remove one first.` });
      return;
    }
    changeTree('add', value, insertValue(root, value));
    setHighlight({ path: [...path, value], target: value, tone: 'success' });
    setMessage({ tone: 'success', text: `Added ${value}. The tree rebalances itself so every branch stays short.` });
    setInput('');
  };

  const handleSearch = () => {
    if (value === null) {
      setMessage({ tone: 'error', text: invalidMessage });
      return;
    }
    setLastChange(null);
    const { found, path } = searchValue(root, value);
    if (found) {
      setHighlight({ path, target: value, tone: 'success' });
      setMessage({
        tone: 'success',
        text: `Found ${value} after checking ${path.length} ${path.length === 1 ? 'node' : 'nodes'}.`,
      });
    } else {
      setHighlight({ path, target: null, tone: 'warning' });
      setMessage({ tone: 'info', text: `${value} is not in the tree. The search ended where it would have been placed.` });
    }
  };

  const handleRemove = () => {
    if (value === null) {
      setMessage({ tone: 'error', text: invalidMessage });
      return;
    }
    const { found, path } = searchValue(root, value);
    if (!found) {
      setHighlight({ path, target: null, tone: 'warning' });
      setMessage({ tone: 'info', text: `${value} is not in the tree, so there is nothing to remove.` });
      return;
    }
    changeTree('remove', value, removeValue(root, value));
    setHighlight(null);
    setMessage({ tone: 'success', text: `Removed ${value}. The tree was rebalanced to keep every branch even.` });
    setInput('');
  };

  const handleSample = () => {
    setLastChange(null);
    setRoot(buildTree(SAMPLE_VALUES));
    setHighlight(null);
    setInput('');
    setMessage({ tone: 'info', text: 'Loaded a sample tree. Try searching for 60 or 25.' });
  };

  const handleClear = () => {
    setLastChange(null);
    setRoot(null);
    setHighlight(null);
    setInput('');
    setMessage({ tone: 'info', text: 'The tree is empty. Add a number to begin.' });
  };

  return (
    <>
      <PageHeader
        eyebrow="BST Playground"
        title="Build a binary search tree"
        description="Add, search, and remove numbers and watch the tree change. The highlighted path shows every step a search takes, and the tree keeps itself balanced."
      />

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(280px, 360px) minmax(0, 1fr)' },
          alignItems: 'start',
        }}
      >
        <Stack spacing={3}>
          <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 4 }}>
            <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
              Choose a number
            </Typography>
            <TextField
              fullWidth
              type="number"
              label="Number"
              placeholder={`${MIN_VALUE} to ${MAX_VALUE}`}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              error={inputInvalid}
              helperText={inputInvalid ? invalidMessage : ' '}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: MIN_VALUE, max: MAX_VALUE, step: 1 }}
              sx={{ '& .MuiInputBase-input': { py: 1.75, lineHeight: 1.5 } }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleInsert();
              }}
            />
            <Stack direction={{ xs: 'column', sm: 'row', lg: 'column', xl: 'row' }} spacing={1.5} sx={{ mt: 1 }}>
              <Button variant="contained" startIcon={<AddRounded />} onClick={handleInsert} fullWidth>
                Add
              </Button>
              <Button variant="outlined" startIcon={<SearchRounded />} onClick={handleSearch} fullWidth>
                Search
              </Button>
              <Button variant="outlined" color="error" startIcon={<DeleteOutlineRounded />} onClick={handleRemove} fullWidth>
                Remove
              </Button>
            </Stack>
            <Alert
              role="status"
              aria-live="polite"
              severity={message.tone}
              variant="outlined"
              sx={{ mt: 2.5, borderRadius: 3, alignItems: 'center' }}
            >
              {message.text}
            </Alert>
          </Paper>

          <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 4 }}>
            <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
              Sample and reset
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row', lg: 'column' }} spacing={1.5}>
              <Button variant="outlined" startIcon={<RestartAltRounded />} onClick={handleSample} fullWidth>
                Load sample tree
              </Button>
              <Button variant="text" color="inherit" onClick={handleClear} fullWidth>
                Clear the tree
              </Button>
            </Stack>
          </Paper>
        </Stack>

        <Stack spacing={3} sx={{ minWidth: 0 }}>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: 'repeat(3, minmax(0, 1fr))' } }}>
            <StatTile icon={AccountTreeRounded} label="Numbers" value={String(nodeCount)} />
            <StatTile icon={LayersRounded} label="Levels" value={String(height)} />
            <StatTile
              icon={FormatListNumberedRounded}
              label="In order"
              value={sortedValues.length > 0 ? sortedValues.join(', ') : 'None'}
            />
          </Box>

          <Paper variant="outlined" sx={{ p: { xs: 3, md: 3 }, borderRadius: 4, minWidth: 0 }}>
            <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
              Your tree
            </Typography>
            <BstTreeView root={root} highlight={highlight} />
            <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap' }}>
              <LegendItem color="#F59E0B" label="Path followed" />
              <LegendItem color="#2E7D32" label="Found or added" />
              <LegendItem color="#DC2626" label="Not found or removed" />
            </Stack>
          </Paper>
        </Stack>
      </Box>

      {lastChange && (
        <Paper variant="outlined" sx={{ p: { xs: 3, md: 3 }, borderRadius: 4, mt: 3, minWidth: 0 }}>
          <Typography component="h2" variant="h5">
            Before and after
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
            {lastChange.action === 'add' ? `Added ${lastChange.value}` : `Removed ${lastChange.value}`}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            }}
          >
            <TreeColumn title="Before" root={lastChange.before} highlight={beforeHighlight(lastChange)} />
            <TreeColumn title="After" root={lastChange.after} highlight={afterHighlight(lastChange)} />
          </Box>
        </Paper>
      )}

      <BstStepsGuide />
    </>
  );
}

type TreeAction = 'add' | 'remove';

interface TreeChange {
  action: TreeAction;
  value: number;
  before: BstNode | null;
  after: BstNode | null;
}

function beforeHighlight({ action, value, before }: TreeChange): Highlight {
  const { path } = searchValue(before, value);
  return action === 'add'
    ? { path, target: null, tone: 'visited' }
    : { path, target: value, tone: 'warning' };
}

function afterHighlight({ action, value, after }: TreeChange): Highlight {
  const { path } = searchValue(after, value);
  return action === 'add'
    ? { path, target: value, tone: 'success' }
    : { path, target: null, tone: 'visited' };
}

function TreeColumn({ title, root, highlight }: { title: string; root: BstNode | null; highlight: Highlight }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="overline" color="primary.main">
        {title}
      </Typography>
      <BstTreeView root={root} highlight={highlight} />
    </Box>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: color }} />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Stack>
  );
}
