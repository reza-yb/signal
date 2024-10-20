import React, { useState, useMemo } from 'react';
import { Container, Typography, Box, Card, CardContent, Button, Stack } from '@mui/material';
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
  const [showShoppingList, setShowShoppingList] = useState(false);

  // Calculate plans for all family members once
  const familyPlans = useMemo(() => {
    return familyMembers.reduce((plans, member) => {
      plans[member.name] = calculateDailyMenu(member.age, member.gender, foodGroups, foods, servings, directionalStatements);
      return plans;
    }, {} as Record<string, FamilyMemberPlan>);
  }, [familyMembers, foodGroups, foods, servings, directionalStatements]);

  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMember(member);
    setShowShoppingList(false);
  };

  const toggleShoppingList = () => {
    setShowShoppingList(!showShoppingList);
    setSelectedMember(null);
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
          <Typography variant="h5" gutterBottom>
            Family Members:
          </Typography>
          <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
            {familyMembers.map((member, index) => (
              <Stack key={index} flex="1 1 auto" minWidth="200px">
                <Card 
                  sx={{ 
                    cursor: 'pointer', 
                    bgcolor: selectedMember === member ? 'primary.light' : 'background.paper'
                  }}
                  onClick={() => handleSelectMember(member)}
                >
                  <CardContent>
                    <Typography variant="h6">{member.name}</Typography>
                    <Typography>{`Age: ${member.age}, Gender: ${member.gender}`}</Typography>
                  </CardContent>
                </Card>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleShoppingList}
            fullWidth
          >
            {showShoppingList ? "Hide Shopping List" : "Show Shopping List"}
          </Button>
        </Box>

        {showShoppingList ? (
          <ShoppingList foods={allFoods} />
        ) : selectedMember && (
          <Box>
            <Typography variant="h4" gutterBottom>
              {selectedMember.name}'s Plan
            </Typography>
            <Stack spacing={3}>
              {Object.entries(familyPlans[selectedMember.name]).map(([groupName, groupData]) => (
                <FoodGroupCard
                  key={groupName}
                  foodGroup={{ foodgroup: groupName } as FoodGroup}
                  servings={groupData.servings}
                  foods={groupData.foods}
                  directionalStatements={groupData.directionalStatements}
                />
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MyPlan;
