import React from 'react';
import { Typography, Box } from '@mui/material';
import { FamilyMember } from '../types/foodGuide';
import { MemberCard, MemberAvatar } from './MyPlanStyles';

interface FamilyMemberSelectorProps {
  familyMembers: FamilyMember[];
  selectedMember: FamilyMember | null;
  onSelectMember: (member: FamilyMember) => void;
}

const FamilyMemberSelector: React.FC<FamilyMemberSelectorProps> = ({
  familyMembers,
  selectedMember,
  onSelectMember,
}) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h5" gutterBottom>
      Family Members:
    </Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {familyMembers.map((member, index) => (
        <MemberCard 
          key={index}
          sx={{ 
            bgcolor: selectedMember === member ? 'primary.light' : 'background.paper',
            flex: '1 1 calc(50% - 16px)',
            minWidth: '200px',
            maxWidth: 'calc(50% - 16px)',
          }}
          onClick={() => onSelectMember(member)}
        >
          <MemberAvatar>{member.name[0].toUpperCase()}</MemberAvatar>
          <Box>
            <Typography variant="h6">{member.name}</Typography>
            <Typography variant="body2">{`Age: ${member.age}, Gender: ${member.gender}`}</Typography>
          </Box>
        </MemberCard>
      ))}
    </Box>
  </Box>
);

export default FamilyMemberSelector;
