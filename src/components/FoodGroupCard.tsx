import React, { useState } from 'react';
import { CardContent, Typography, Button, Chip, Box, Dialog, DialogTitle, DialogContent } from '@mui/material';
import {FoodGroup, FoodItem} from '../types/foodGuide';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StyledCard, CardHeader } from './FoodGroupCard/styles';
import FoodList from './FoodList';
import TipsList from './TipsList';

interface FoodGroupCardProps {
  foodGroup: FoodGroup;
  servings: number;
  foods: { food: FoodItem; servings: number }[];
  directionalStatements: string[];
}

const FoodGroupCard: React.FC<FoodGroupCardProps> = ({
  foodGroup,
  servings,
  foods,
  directionalStatements,
}) => {
  const [showTips, setShowTips] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <StyledCard>
      <CardHeader>
        <Typography variant="h6" component="div">
          {foodGroup.foodgroup}
        </Typography>
        <Chip 
          label={`${servings} servings`} 
          size="small" 
          sx={{ 
            mt: 1, 
            backgroundColor: theme => theme.palette.primary.light,
            color: theme => theme.palette.primary.contrastText,
          }}
        />
      </CardHeader>
      <CardContent sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1, overflow: 'auto', minHeight: 200 }}>
          {!showTips ? (
            <>
              <FoodList items={foods.slice(0, 3)} />
              {foods.length > 3 && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Button
                    onClick={handleOpenDialog}
                    startIcon={<ExpandMoreIcon />}
                    variant="outlined"
                    size="small"
                  >
                    Show {foods.length - 3} More
                  </Button>
                </Box>
              )}
            </>
          ) : (
            <TipsList tips={directionalStatements} />
          )}
        </Box>
      </CardContent>
      <Button 
        startIcon={showTips ? <RestaurantIcon /> : <TipsAndUpdatesIcon />}
        onClick={() => setShowTips(!showTips)}
        sx={{ 
          mt: 'auto', 
          color: 'secondary.main',
          '&:hover': {
            backgroundColor: 'secondary.light',
            color: 'secondary.contrastText',
          },
        }}
      >
        {showTips ? 'Show Foods' : 'Show Tips'}
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{foodGroup.foodgroup} - All Foods</DialogTitle>
        <DialogContent>
          <FoodList items={foods} />
        </DialogContent>
      </Dialog>
    </StyledCard>
  );
};

export default FoodGroupCard;
