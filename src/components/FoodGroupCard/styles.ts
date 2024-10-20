import { styled } from '@mui/system';
import { Card, Box, Chip } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: (theme.shadows as string[])[4],
  },
}));

export const CardHeader = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
}));

export const FoodItemChip = styled(Chip)(({ theme }) => ({
  width: '100%',
  justifyContent: 'flex-start',
  height: 'auto',
  padding: theme.spacing(1),
  '& .MuiChip-label': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    whiteSpace: 'normal',
    width: '100%',
  },
}));
