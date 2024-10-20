import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === 'light' 
    ? theme.palette.primary.main
    : theme.palette.background.paper,
  color: theme.palette.mode === 'light'
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
}));

export const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

export const FlashyButton = styled(Button)<{ component?: React.ElementType; to?: string }>(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.contrastText,
  },
  '&:focus': {
    backgroundColor: theme.palette.secondary.main,
    outline: 'none',
  },
  '&:active': {
    backgroundColor: theme.palette.secondary.dark,
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.secondary.main,
    outline: `3px solid ${theme.palette.secondary.light}`,
  },
}));
