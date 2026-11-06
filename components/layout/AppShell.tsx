'use client';

import { useState } from 'react';
import { AppBar, Box, Container, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import MenuRounded from '@mui/icons-material/MenuRounded';
import SideNav from '@/components/layout/SideNav';

const DRAWER_WIDTH = 264;

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          },
        }}
      >
        <SideNav />
      </Drawer>

      <Drawer
        variant="temporary"
        open={isMobileNavOpen}
        onClose={closeMobileNav}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', bgcolor: 'background.paper' },
        }}
      >
        <SideNav onNavigate={closeMobileNav} />
      </Drawer>

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          display: { xs: 'block', md: 'none' },
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ gap: 1.5 }}>
          <IconButton edge="start" aria-label="Open navigation" onClick={() => setIsMobileNavOpen(true)}>
            <MenuRounded />
          </IconButton>
          <Typography variant="h6" component="div">
            BST Academy
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ ml: { xs: 0, md: `${DRAWER_WIDTH}px` }, minWidth: 0 }}>
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 }, display: 'grid', gap: { xs: 4, md: 5 } }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
