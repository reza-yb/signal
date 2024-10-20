import React from 'react';
import { CardContent, Typography, Chip, Box } from '@mui/material';
import { StyledCard } from './StyledComponents';

interface CardLayoutProps {
  title: string;
  subtitle?: string | number;
  children: React.ReactNode;
}

const CardLayout: React.FC<CardLayoutProps> = ({ title, subtitle, children }) => (
  <StyledCard>
    <Box sx={{ p: 2, bgcolor: 'background.default' }}>
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      {subtitle && (
        <Chip 
          label={subtitle} 
          size="small" 
          sx={{ 
            mt: 1, 
            backgroundColor: theme => theme.palette.primary.light,
            color: theme => theme.palette.primary.contrastText,
          }}
        />
      )}
    </Box>
    <CardContent sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
      {children}
    </CardContent>
  </StyledCard>
);

export default CardLayout;
