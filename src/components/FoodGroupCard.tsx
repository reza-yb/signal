import React, { useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Button, Chip, Box, Collapse } from '@mui/material';
import { FoodGroup, FoodItem } from '../types/foodGuide';
import { styled } from '@mui/system';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface FoodGroupCardProps {
  foodGroup: FoodGroup;
  servings: number;
  foods: { food: FoodItem; servings: number }[];
  directionalStatements: string[];
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: (theme.shadows as string[])[4],
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
}));

const FoodGroupCard: React.FC<FoodGroupCardProps> = ({
  foodGroup,
  servings,
  foods,
  directionalStatements,
}) => {
  const [showTips, setShowTips] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const renderFoodList = () => (
    <>
      <List dense>
        {foods.slice(0, 3).map((item, index) => (
          <ListItem key={index} disableGutters>
            <ListItemText 
              primary={`${item.food.food}`}
              secondary={`${item.servings} serving${item.servings > 1 ? 's' : ''}`}
            />
          </ListItem>
        ))}
      </List>
      {foods.length > 3 && (
        <>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <List dense>
              {foods.slice(3).map((item, index) => (
                <ListItem key={index + 3} disableGutters>
                  <ListItemText 
                    primary={`${item.food.food}`}
                    secondary={`${item.servings} serving${item.servings > 1 ? 's' : ''}`}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Button
            onClick={handleExpandClick}
            startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{ mt: 1 }}
          >
            {expanded ? 'Show Less' : `Show ${foods.length - 3} More`}
          </Button>
        </>
      )}
    </>
  );

  return (
    <StyledCard>
      <CardHeader>
        <Typography variant="h6" component="div">
          {foodGroup.foodgroup}
        </Typography>
        <Chip 
          label={`${servings} servings`} 
          size="small" 
          sx={{ mt: 1, backgroundColor: 'rgba(255,255,255,0.2)' }}
        />
      </CardHeader>
      <CardContent sx={{ flexGrow: 1 }}>
        {!showTips ? renderFoodList() : (
          <List dense>
            {directionalStatements.map((statement, index) => (
              <ListItem key={index} disableGutters>
                <ListItemText primary={statement} />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
      <Button 
        startIcon={showTips ? <RestaurantIcon /> : <TipsAndUpdatesIcon />}
        onClick={() => setShowTips(!showTips)}
        sx={{ mt: 'auto' }}
      >
        {showTips ? 'Show Foods' : 'Show Tips'}
      </Button>
    </StyledCard>
  );
};

export default FoodGroupCard;
