import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === 'light' 
    ? theme.palette.primary.main  // Use primary color for light mode
    : theme.palette.background.paper,  // Use paper background for dark mode
  color: theme.palette.mode === 'light'
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const LogoBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const FlashyButton = styled(Button)<{ component?: React.ElementType; to?: string }>(({ theme }) => ({
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

const Header: React.FC<{ toggleColorMode: () => void }> = ({ toggleColorMode }) => {
  const location = useLocation();
  const theme = useTheme();
  const isHomePage = location.pathname === '/';

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <LogoBox>
          <RestaurantMenuIcon sx={{ mr: 2, fontSize: 32 }} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Canada's Optimal Food Planner
          </Typography>
        </LogoBox>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {!isHomePage && (
            <FlashyButton
              component={RouterLink}
              to="/"
              startIcon={<AddIcon />}
              variant="contained"
              sx={{ ml: 2 }}
            >
              New Meal Plan
            </FlashyButton>
          )}
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
