import React from 'react';
import { Box, Typography, CardContent, IconButton, Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FamilyMember } from '../types/foodGuide';
import { styled } from '@mui/material/styles';
import { StyledAvatar } from './HomeStyles';

const MemberCard = styled(Card)(({ theme }) => ({
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

interface FamilyMemberCardProps {
  member: FamilyMember;
  onRemove: () => void;
}

const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({ member, onRemove }) => (
  <MemberCard>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <StyledAvatar>{member.name[0].toUpperCase()}</StyledAvatar>
      <CardContent>
        <Typography variant="h6">{member.name}</Typography>
        <Typography variant="body2" color="textSecondary">{`${member.age} years old, ${member.gender}`}</Typography>
      </CardContent>
    </Box>
    <IconButton onClick={onRemove} color="error">
      <DeleteIcon />
    </IconButton>
  </MemberCard>
);

export default FamilyMemberCard;
