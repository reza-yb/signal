import React from 'react';
import { AppBar, Toolbar, Typography, styled } from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: '100%',
}));

const Header: React.FC = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Canada's Optimal Food Planner
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
