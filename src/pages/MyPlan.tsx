import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import { FamilyMember } from '../types/foodGuide';
import ShoppingList from '../components/ShoppingList';
import FamilyMemberSelector from './FamilyMemberSelector';
import PlanDisplay from './PlanDisplay';
import { useFamilyPlans } from '../hooks/useFamilyPlans';
import {FoodWithServings, MyPlanProps} from "../types/props";

// Component to display personalized daily menu and shopping list for family members
const MyPlan: React.FC<MyPlanProps> = ({
  familyMembers,
  foodGroups,
  foods,
  servings,
  directionalStatements,
}) => {
  const navigate = useNavigate();
  // State for currently selected family member and active tab
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(familyMembers[0] || null);
  const [activeTab, setActiveTab] = useState<'menu' | 'shopping'>('menu');

  // Custom hook to generate family plans
  const familyPlans = useFamilyPlans(familyMembers, foodGroups, foods, servings, directionalStatements);

  // Redirect to home if no family plans are available
  useEffect(() => {
    if (Object.keys(familyPlans).length === 0) {
      navigate('/');
    }
  }, [familyPlans, navigate]);

  // Set default selected member when switching to menu tab
  useEffect(() => {
    if (activeTab === 'menu' && familyMembers.length > 0) {
      setSelectedMember(familyMembers[0]);
    }
  }, [activeTab, familyMembers]);

  // Handler for selecting a family member
  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMember(member);
    setActiveTab('menu');
  };

  // Handler for changing tabs
  const handleTabChange = (_: React.SyntheticEvent, newValue: 'menu' | 'shopping') => {
    setActiveTab(newValue);
    if (newValue === 'shopping') {
      setSelectedMember(null);
    }
  };

  // Memoized list of all foods for shopping list
  const allFoods = useMemo((): FoodWithServings[] => {
    return Object.values(familyPlans).flatMap(plan => 
      Object.values(plan as Record<string, { foods: FoodWithServings[] }>).flatMap(group => group.foods)
    );
  }, [familyPlans]);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      {Object.keys(familyPlans).length > 0 ? (
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4 }}>
            Your Family's Personalized Daily Menu
          </Typography>
          
          {/* Tab navigation */}
          <Box sx={{ mb: 4 }}>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="Menu" value="menu" />
              <Tab label="Shopping List" value="shopping" />
            </Tabs>
          </Box>

          {/* Family member selector (only shown in menu tab) */}
          {activeTab === 'menu' && (
            <FamilyMemberSelector 
              familyMembers={familyMembers}
              selectedMember={selectedMember}
              onSelectMember={handleSelectMember}
            />
          )}

          {/* Render shopping list or plan display based on active tab */}
          {activeTab === 'shopping' ? (
            <ShoppingList foods={allFoods} />
          ) : selectedMember && (
            <PlanDisplay 
              selectedMember={selectedMember}
              familyPlan={familyPlans[selectedMember.name]}
            />
          )}
        </Container>
      ) : null}
    </Box>
  );
};

export default MyPlan;
