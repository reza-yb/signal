import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { FoodItem } from '../types/foodGuide';
import { aggregateDuplicateItems } from '../utils/menuCalculator';

interface ShoppingListProps {
  foods: { food: FoodItem; servings: number }[];
}

const ShoppingList: React.FC<ShoppingListProps> = ({ foods }) => {
  console.log('Foods passed to ShoppingList:', foods);
  const aggregatedFoods = aggregateDuplicateItems(foods);
  console.log('Aggregated foods:', aggregatedFoods);

  const sortedFoods = aggregatedFoods.sort((a, b) => 
    a.food.food.localeCompare(b.food.food)
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Shopping List
      </Typography>
      <List>
        {sortedFoods.map((foodItem, index) => (
          <ListItem key={index}>
            <ListItemText 
              primary={`${foodItem.food.food} (${foodItem.servings})`} 
              secondary={`${foodItem.food.srvg_sz}`} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ShoppingList;
