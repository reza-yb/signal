import { createTheme, ThemeOptions } from '@mui/material/styles';

const getTheme = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#1976d2', // Changed to a more visually appealing blue
            light: '#63a4ff',
            dark: '#004ba0',
          },
          secondary: {
            main: '#d32f2f', // Changed to a more visually appealing red
            light: '#ff6659',
            dark: '#9a0007',
          },
          background: {
            default: '#e0f7fa', // Changed to a lighter and more pleasant background color
            paper: '#ffffff',
          },
          text: {
            primary: '#212121', // Changed to a darker shade for better readability
            secondary: '#757575',
          },
        }
      : {
          primary: {
            main: '#90caf9', // Changed to a more visually appealing light blue
            light: '#e3f2fd',
            dark: '#42a5f5',
          },
          secondary: {
            main: '#f48fb1', // Changed to a more visually appealing light pink
            light: '#f8bbd0',
            dark: '#ec407a',
          },
          background: {
            default: '#121212', // Changed to a darker background for better contrast
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
          },
        }),
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
            backgroundColor: '#42a5f5', // Darker shade of primary color
          },
          '&.MuiButton-colorSecondary': {
            backgroundColor: '#ec407a', // Secondary main color
            color: '#ffffff', // Ensure text color is white or appropriate contrast
            '&:hover': {
              backgroundColor: '#b0003a', // Darker shade of secondary color
            },
          },
        },
      },
    },
  },
});

export const lightTheme = createTheme(getTheme('light'));
export const darkTheme = createTheme(getTheme('dark'));
