import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: 'auto',
  bgcolor: theme.palette.primary.main,
  width: 60,
  height: 60,
}));
