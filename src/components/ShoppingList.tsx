import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Divider, Chip, Button } from '@mui/material';
import { FoodItem } from '../types/foodGuide';
import { aggregateDuplicateItems } from '../utils/menuCalculator';
import { ShoppingCart, ExpandMore } from '@mui/icons-material';
import { ShoppingListProps } from '../types/shared';

const ShoppingList: React.FC<ShoppingListProps> = ({ foods }) => {
  const [expanded, setExpanded] = useState(false);
  const aggregatedFoods = aggregateDuplicateItems(foods);

  const sortedFoods = aggregatedFoods.sort((a, b) => 
    a.food.food.localeCompare(b.food.food)
  );

  const displayedFoods = expanded ? sortedFoods : sortedFoods.slice(0, 4);

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShoppingCart sx={{ mr: 1 }} />
          Shopping List
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {displayedFoods.map((foodItem, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ py: 2, flexDirection: 'column', alignItems: 'flex-start' }}>
                <ListItemText 
                  primary={
                    <Typography variant="subtitle1" fontWeight="bold">
                      {foodItem.food.food}
                    </Typography>
                  }
                />
                <Chip 
                  icon={<ShoppingCart />}
                  label={`${foodItem.servings} × ${foodItem.food.srvg_sz}`}
                  color="primary"
                  size="small"
                  sx={{ fontWeight: 'bold', mt: 1 }}
                />
              </ListItem>
              {index < displayedFoods.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
        {sortedFoods.length > 4 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              onClick={() => setExpanded(!expanded)}
              startIcon={<ExpandMore />}
              variant="outlined"
            >
              {expanded ? 'Show Less' : `Show ${sortedFoods.length - 4} More`}
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ShoppingList;
