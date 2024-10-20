import { styled } from '@mui/material/styles';
import { Card, Avatar } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[4],
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
}));

export const MemberCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[4],
  },
}));
