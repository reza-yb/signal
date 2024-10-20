import { styled } from '@mui/material/styles';
import { Card, Avatar } from '@mui/material';

export const MemberCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[4],
  },
}));

export const MemberAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
}));
