'use client';

import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
} from '@mui/material';
import PageHeader from '@/components/layout/PageHeader';
import PageLoading from '@/components/layout/PageLoading';
import { createDefaultLearnerState } from '@/lib/learning/defaultLearnerState';
import { useLearnerState } from '@/hooks/useLearnerState';

export default function SettingsPage() {
  const { isLoaded, updateState } = useLearnerState();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  if (!isLoaded) return <PageLoading />;

  const resetProgress = () => {
    updateState(() => createDefaultLearnerState());
    setIsConfirmOpen(false);
  };

  return (
    <>
      <PageHeader
        eyebrow="Preferences"
        title="Settings"
        description="Manage the information stored on this device."
      />

      <Paper component="section" variant="outlined" aria-labelledby="data-heading" sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4 }}>
        <Typography id="data-heading" component="h2" variant="h2">
          Your data
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, maxWidth: 640 }}>
          Your progress, points, badges and streak are saved on this device. Resetting removes all of them and returns
          every topic to its starting state. This can't be undone.
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setIsConfirmOpen(true)}
          sx={{ mt: 3 }}
        >
          Reset progress
        </Button>
      </Paper>

      <Dialog open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} aria-labelledby="reset-dialog-title" maxWidth="xs" fullWidth>
        <DialogTitle id="reset-dialog-title">Reset all progress?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Every completed topic, point, badge and streak day will be removed from this device.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setIsConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={resetProgress} variant="contained" color="error">
            Reset everything
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
