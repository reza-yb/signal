import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Tooltip,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { FamilyMember } from '../types/foodGuide';
import { StyledAvatar } from './HomeStyles';
import FamilyMemberForm from './FamilyMemberForm';
import FamilyMemberCard from './FamilyMemberCard';

interface HomeProps {
  onGeneratePlan: (members: FamilyMember[]) => void;
}

const Home: React.FC<HomeProps> = ({ onGeneratePlan }) => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const navigate = useNavigate();

  const handleAddMember = (newMember: FamilyMember) => {
    setFamilyMembers([...familyMembers, newMember]);
  };

  const handleRemoveMember = (index: number) => {
    setFamilyMembers(familyMembers.filter((_, i) => i !== index));
  };

  const handleGeneratePlan = () => {
    if (familyMembers.length > 0) {
      onGeneratePlan(familyMembers);
      navigate('/plan');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <StyledAvatar>
          <RestaurantIcon fontSize="large" />
        </StyledAvatar>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
          Create Your Optimal Meal Plan
        </Typography>
      </Box>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <FamilyMemberForm onAddMember={handleAddMember} />
        {familyMembers.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Family Members:
            </Typography>
            {familyMembers.map((member, index) => (
              <FamilyMemberCard
                key={index}
                member={member}
                onRemove={() => handleRemoveMember(index)}
              />
            ))}
          </Box>
        )}
        <Box sx={{ mt: 6 }}>
          <Tooltip title={familyMembers.length === 0 ? "Add at least one family member to generate a plan" : ""}>
            <span>
              <Button
                onClick={handleGeneratePlan}
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                disabled={familyMembers.length === 0}
                sx={{ 
                  py: 2,
                  opacity: familyMembers.length === 0 ? 0.5 : 1,
                  cursor: familyMembers.length === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                Generate Personalized Plan
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
