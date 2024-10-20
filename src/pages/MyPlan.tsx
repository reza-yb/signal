import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Card, CardContent, Tabs, Tab, Avatar } from '@mui/material';
import { FoodGroup, FoodItem, ServingRecommendation, DirectionalStatement, FamilyMember } from '../types/foodGuide';
import FoodGroupCard from '../components/FoodGroupCard';
import ShoppingList from '../components/ShoppingList';
import { calculateDailyMenu } from '../utils/menuCalculator';
import styled from '@mui/material/styles/styled';

interface MyPlanProps {
  familyMembers: FamilyMember[];
  foodGroups: FoodGroup[];
  foods: FoodItem[];
  servings: ServingRecommendation[];
  directionalStatements: DirectionalStatement[];
}

interface FamilyMemberPlan {
  [groupName: string]: {
    servings: number;
    foods: { food: FoodItem; servings: number; }[];
    directionalStatements: string[];
  };
}

const MyPlan: React.FC<MyPlanProps> = ({
  familyMembers,
  foodGroups,
  foods,
  servings,
  directionalStatements,
}) => {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(familyMembers[0] || null);
  const [activeTab, setActiveTab] = useState<'menu' | 'shopping'>('menu');

  // Calculate plans for all family members once
  const familyPlans = useMemo(() => {
    return familyMembers.reduce((plans, member) => {
      plans[member.name] = calculateDailyMenu(member.age, member.gender, foodGroups, foods, servings, directionalStatements);
      return plans;
    }, {} as Record<string, FamilyMemberPlan>);
  }, [familyMembers, foodGroups, foods, servings, directionalStatements]);

  useEffect(() => {
    if (Object.keys(familyPlans).length === 0) {
      navigate('/');
    }
  }, [familyPlans, navigate]);

  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMember(member);
    setActiveTab('menu');
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: 'menu' | 'shopping') => {
    setActiveTab(newValue);
    if (newValue === 'shopping') {
      setSelectedMember(null);
    }
  };

  const allFoods = useMemo(() => {
    const foods = Object.values(familyPlans).flatMap(plan => 
      Object.values(plan).flatMap(group => group.foods)
    );
    console.log('All foods before passing to ShoppingList:', foods);
    return foods;
  }, [familyPlans]);

  const MemberCard = styled(Card)(({ theme }) => ({
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

  const MemberAvatar = styled(Avatar)(({ theme }) => ({
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  }));

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      {Object.keys(familyPlans).length > 0 ? (
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4 }}>
            Your Family's Personalized Daily Menu
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="Menu" value="menu" />
              <Tab label="Shopping List" value="shopping" />
            </Tabs>
          </Box>

          {activeTab === 'menu' && (
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
                      flex: '1 1 calc(33.333% - 16px)',
                      minWidth: '200px',
                      maxWidth: 'calc(33.333% - 16px)',
                    }}
                    onClick={() => handleSelectMember(member)}
                  >
                    <MemberAvatar>{member.name[0].toUpperCase()}</MemberAvatar>
                    <CardContent>
                      <Typography variant="h6">{member.name}</Typography>
                      <Typography variant="body2">{`Age: ${member.age}, Gender: ${member.gender}`}</Typography>
                    </CardContent>
                  </MemberCard>
                ))}
              </Box>
            </Box>
          )}

          {activeTab === 'shopping' ? (
            <ShoppingList foods={allFoods} />
          ) : selectedMember && (
            <Box>
              <Typography variant="h4" gutterBottom>
                {selectedMember.name}'s Plan
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {Object.entries(familyPlans[selectedMember.name]).map(([groupName, groupData]) => (
                  <Box key={groupName} sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' } }}>
                    <FoodGroupCard
                      foodGroup={{ foodgroup: groupName } as FoodGroup}
                      servings={groupData.servings}
                      foods={groupData.foods}
                      directionalStatements={groupData.directionalStatements}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Container>
      ) : null}
    </Box>
  );
};

export default MyPlan;
