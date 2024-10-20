import React, { useState } from 'react';
import { Button, Box, Dialog, DialogTitle, DialogContent } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardLayout from './shared/CardLayout';
import FoodList from './FoodList';
import TipsList from './TipsList';
import { FoodGroupCardProps } from '../types/shared';

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
    <CardLayout title={foodGroup.foodgroup} subtitle={`${servings} servings`}>
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
    </CardLayout>
  );
};

export default FoodGroupCard;
