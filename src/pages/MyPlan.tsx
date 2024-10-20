import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { FoodGroup, FoodItem, ServingRecommendation, DirectionalStatement } from '../types/foodGuide';
import FoodGroupCard from '../components/FoodGroupCard';
import { calculateDailyMenu } from '../utils/menuCalculator';

interface MyPlanProps {
  individualPlan: { age: number; gender: string };
  foodGroups: FoodGroup[];
  foods: FoodItem[];
  servings: ServingRecommendation[];
  directionalStatements: DirectionalStatement[];
}

const MyPlan: React.FC<MyPlanProps> = ({
  individualPlan,
  foodGroups,
  foods,
  servings,
  directionalStatements,
}) => {
  const dailyMenu = calculateDailyMenu(
    individualPlan.age,
    individualPlan.gender,
    foodGroups,
    foods,
    servings,
    directionalStatements
  );

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4 }}>
          Your Personalized Daily Menu
        </Typography>
        <Grid container spacing={3}>
          {Object.entries(dailyMenu).map(([groupName, groupData]) => (
            <Grid item xs={12} sm={6} md={4} key={groupName}>
              <FoodGroupCard
                foodGroup={{ foodgroup: groupName } as FoodGroup}
                servings={groupData.servings}
                foods={groupData.foods}
                directionalStatements={groupData.directionalStatements}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MyPlan;
