import React from 'react';
import { Typography, Box } from '@mui/material';
import FoodGroupCard from '../components/FoodGroupCard';
import { FamilyMember } from '../types/foodGuide';
import { FamilyMemberPlan } from './types';

interface PlanDisplayProps {
  selectedMember: FamilyMember;
  familyPlan: FamilyMemberPlan;
}

const PlanDisplay: React.FC<PlanDisplayProps> = ({ selectedMember, familyPlan }) => (
  <Box>
    <Typography variant="h4" gutterBottom>
      {selectedMember.name}'s Plan
    </Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {Object.entries(familyPlan).map(([groupName, groupData]) => (
        <Box key={groupName} sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
          <FoodGroupCard
            foodGroup={{ foodgroup: groupName } as any}
            servings={groupData.servings}
            foods={groupData.foods}
            directionalStatements={groupData.directionalStatements}
          />
        </Box>
      ))}
    </Box>
  </Box>
);

export default PlanDisplay;
