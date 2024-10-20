import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
      light: '#ff79b0',
      dark: '#c60055',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
          },
          '&.Mui-focusVisible': {
            outline: 'none',
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          transition: 'background-color 0.3s, transform 0.2s',
          '&:focus': {
            outline: 'none',
          },
        },
        contained: {
          '&:hover': {
            backgroundColor: '#1976d2', // Darker shade of primary color
          },
          '&.MuiButton-colorSecondary': {
            backgroundColor: '#ff4081', // Secondary main color
            color: '#ffffff', // Ensure text color is white or appropriate contrast
            '&:hover': {
              backgroundColor: '#c60055', // Darker shade of secondary color
            },
          },
        },
      },
    },
  },
});

export default baseTheme;
