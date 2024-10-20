import React, { useState, useMemo } from 'react';
import { Container, Typography, Box, Card, CardContent, Tabs, Tab } from '@mui/material';
import { FoodGroup, FoodItem, ServingRecommendation, DirectionalStatement, FamilyMember } from '../types/foodGuide';
import FoodGroupCard from '../components/FoodGroupCard';
import ShoppingList from '../components/ShoppingList';
import { calculateDailyMenu } from '../utils/menuCalculator';

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
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(familyMembers[0] || null);
  const [activeTab, setActiveTab] = useState<'menu' | 'shopping'>('menu');

  // Calculate plans for all family members once
  const familyPlans = useMemo(() => {
    return familyMembers.reduce((plans, member) => {
      plans[member.name] = calculateDailyMenu(member.age, member.gender, foodGroups, foods, servings, directionalStatements);
      return plans;
    }, {} as Record<string, FamilyMemberPlan>);
  }, [familyMembers, foodGroups, foods, servings, directionalStatements]);

  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMember(member);
    setActiveTab('menu');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: 'menu' | 'shopping') => {
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

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
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
                <Card 
                  key={index}
                  sx={{ 
                    cursor: 'pointer', 
                    bgcolor: selectedMember === member ? 'primary.light' : 'background.paper',
                    flex: '1 1 calc(33.333% - 16px)',
                    minWidth: '200px',
                    maxWidth: 'calc(33.333% - 16px)',
                  }}
                  onClick={() => handleSelectMember(member)}
                >
                  <CardContent>
                    <Typography variant="h6">{member.name}</Typography>
                    <Typography>{`Age: ${member.age}, Gender: ${member.gender}`}</Typography>
                  </CardContent>
                </Card>
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
    </Box>
  );
};

export default MyPlan;
