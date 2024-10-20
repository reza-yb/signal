import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { StyledAppBar, StyledToolbar, FlashyButton } from './HeaderStyles';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';

const Header: React.FC<{ toggleColorMode: () => void }> = ({ toggleColorMode }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Logo />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ThemeToggle toggleColorMode={toggleColorMode} />
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
