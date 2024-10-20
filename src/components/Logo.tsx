import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const Logo: React.FC = () => (
  <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center' }}>
    <RestaurantMenuIcon sx={{ mr: 2, fontSize: 32, color: '#ffffff' }} />
    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
      Canada's Optimal Food Planner
    </Typography>
  </Box>
);

export default Logo;
