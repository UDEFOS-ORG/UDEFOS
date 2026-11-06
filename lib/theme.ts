import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#1456A3', light: '#4A86D6', dark: '#0B3D78', contrastText: '#FFFFFF' },
    secondary: { main: '#0F766E', light: '#3AA59C', dark: '#0A4F4A', contrastText: '#FFFFFF' },
    success: { main: '#2E7D32', light: '#4CAF50', dark: '#1B5E20', contrastText: '#FFFFFF' },
    warning: { main: '#B45309', light: '#F59E0B', dark: '#92400E', contrastText: '#FFFFFF' },
    error: { main: '#B42318', contrastText: '#FFFFFF' },
    background: { default: '#F3F6FA', paper: '#FFFFFF' },
    text: { primary: '#0F1B2D', secondary: '#4B5A70' },
    divider: '#DCE3EC',
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'var(--font-inter), system-ui, -apple-system, "Segoe UI", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' },
    h2: { fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' },
    h3: { fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2 },
    h4: { fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.2 },
    h5: { fontSize: '1.125rem', fontWeight: 700, lineHeight: 1.2 },
    h6: { fontSize: '1rem', fontWeight: 700, lineHeight: 1.2 },
    body1: { lineHeight: 1.5 },
    body2: { lineHeight: 1.5 },
    overline: { fontWeight: 600, letterSpacing: '0.08em', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, paddingLeft: 20, paddingRight: 20, boxShadow: 'none' },
      },
    },
  },
});
