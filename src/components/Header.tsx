import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, styled } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AddIcon from '@mui/icons-material/Add';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: '100%',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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

const Header: React.FC = () => {
  const location = useLocation();
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
        {!isHomePage && (
          <FlashyButton
            component={RouterLink}
            to="/"
            startIcon={<AddIcon />}
            variant="contained"
          >
            New Meal Plan
          </FlashyButton>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
