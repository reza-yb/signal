import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { FoodItemChip } from './FoodGroupCard/styles';
import { FoodListProps } from '../types/shared';

const FoodList: React.FC<FoodListProps> = ({ items }) => (
  <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
    {items.map((item, index) => (
      <Box gridColumn="span 12" key={index}>
        <FoodItemChip
          icon={<RestaurantIcon />}
          label={
            <Box>
              <Typography variant="body1" fontWeight="bold">{item.food.food}</Typography>
              <Divider sx={{ my: 0.5 }} />
              <Box display="flex" alignItems="center">
                <LocalDiningIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {`${item.servings} x ${item.food.srvg_sz}`}
                </Typography>
              </Box>
            </Box>
          }
          variant="outlined"
        />
      </Box>
    ))}
  </Box>
);

export default FoodList;
