import React, { useState } from 'react';
import { Button, Box, Dialog, DialogTitle, DialogContent } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardLayout from './shared/CardLayout';
import FoodList from './FoodList';
import TipsList from './TipsList';
import {FoodGroupCardProps} from "../types/props";

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
    <CardLayout 
      title={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{foodGroup.foodgroup}</span>
          <Button 
            onClick={() => setShowTips(!showTips)}
            sx={{ 
              minWidth: 0,
              padding: 0,
              color: 'secondary.main',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'secondary.light',  // Change icon color to white on hover
              },
            }}
          >
            {showTips ? <RestaurantIcon /> : <TipsAndUpdatesIcon />}
          </Button>
        </Box>
      }
      subtitle={`${servings} servings`}
    >
      <Box sx={{ position: 'relative', flexGrow: 1, overflow: 'auto', minHeight: 300, maxHeight: 300 }}>
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
