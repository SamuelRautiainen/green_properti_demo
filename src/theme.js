import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4A7C59',
      light: '#6B9B7A',
      dark: '#2D5A3D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7FBF8E',
      light: '#A5D6A7',
      dark: '#5A9A6A',
      contrastText: '#0A1F14',
    },
    background: {
      default: '#0A1F14',
      paper: '#122A1C',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B8D4C0',
    },
    success: {
      main: '#4ADE80',
      contrastText: '#0A1F14',
    },
    warning: {
      main: '#FBBF24',
      contrastText: '#0A1F14',
    },
    error: {
      main: '#F87171',
      contrastText: '#FFFFFF',
    },
    divider: 'rgba(74, 124, 89, 0.3)',
  },
  typography: {
    fontFamily: '"Inter", "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h4: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h5: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
    },
    h6: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 600,
      fontSize: '0.875rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      color: '#B8D4C0',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0A1F14',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#122A1C',
          borderRadius: 16,
          border: '1px solid rgba(74, 124, 89, 0.2)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#122A1C',
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 20px',
        },
        contained: {
          backgroundColor: '#2D5A3D',
          '&:hover': {
            backgroundColor: '#4A7C59',
          },
        },
        outlined: {
          borderColor: '#4A7C59',
          color: '#FFFFFF',
          '&:hover': {
            borderColor: '#6B9B7A',
            backgroundColor: 'rgba(74, 124, 89, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(18, 42, 28, 0.5)',
            '& fieldset': {
              borderColor: 'rgba(74, 124, 89, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: '#4A7C59',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#7FBF8E',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(18, 42, 28, 0.5)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(74, 124, 89, 0.2)',
        },
        head: {
          backgroundColor: '#1A3D28',
          fontWeight: 600,
          color: '#B8D4C0',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(74, 124, 89, 0.1)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
        filled: {
          backgroundColor: '#2D5A3D',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          color: '#B8D4C0',
          '&.Mui-selected': {
            color: '#FFFFFF',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#4A7C59',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0D2818',
          borderRight: '1px solid rgba(74, 124, 89, 0.2)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0D2818',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(74, 124, 89, 0.2)',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: '#122A1C',
          border: '1px solid rgba(74, 124, 89, 0.2)',
          '&:before': {
            display: 'none',
          },
        },
      },
    },
  },
});

export default theme;


