'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import HubRounded from '@mui/icons-material/HubRounded';
import { NAV_ITEMS } from '@/components/layout/navItems';

interface SideNavProps {
  onNavigate?: () => void;
}

export default function SideNav({ onNavigate }: SideNavProps) {
  const pathname = usePathname();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%', p: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1, pt: 0.5 }}>
        <Box
          aria-hidden
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <HubRounded sx={{ fontSize: 22 }} />
        </Box>
        <Box>
          <Typography variant="h6" component="div" sx={{ lineHeight: 1.1 }}>
            BST Academy
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Learn binary search trees
          </Typography>
        </Box>
      </Box>

      <Box component="nav" aria-label="Main navigation">
        <List disablePadding sx={{ display: 'grid', gap: 0.5 }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.available && pathname === item.href;

            if (!item.available) {
              return (
                <ListItem
                  key={item.label}
                  aria-disabled="true"
                  sx={{ borderRadius: 2, px: 1.5, py: 1, color: 'text.secondary', gap: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={item.label} primaryTypographyProps={{ variant: 'body2' }} />
                  <Chip size="small" variant="outlined" label="Soon" />
                </ListItem>
              );
            }

            return (
              <ListItemButton
                key={item.label}
                component={Link}
                href={item.href}
                selected={isActive}
                aria-current={isActive ? 'page' : undefined}
                onClick={onNavigate}
                sx={{
                  borderRadius: 2,
                  px: 1.5,
                  py: 1,
                  gap: 1,
                  color: isActive ? 'primary.dark' : 'text.primary',
                  '&.Mui-selected': { bgcolor: 'rgba(20, 86, 163, 0.1)', color: 'primary.dark' },
                  '&.Mui-selected:hover': { bgcolor: 'rgba(20, 86, 163, 0.14)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: isActive ? 600 : 500 }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
