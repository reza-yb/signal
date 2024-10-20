import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import { FamilyMember } from '../types/foodGuide';
import ShoppingList from '../components/ShoppingList';
import FamilyMemberSelector from './FamilyMemberSelector';
import PlanDisplay from './PlanDisplay';
import { useFamilyPlans } from '../hooks/useFamilyPlans';
import {MyPlanProps} from "../types/props.ts";

const MyPlan: React.FC<MyPlanProps> = ({
  familyMembers,
  foodGroups,
  foods,
  servings,
  directionalStatements,
}) => {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(familyMembers[0] || null);
  const [activeTab, setActiveTab] = useState<'menu' | 'shopping'>('menu');

  const familyPlans = useFamilyPlans(familyMembers, foodGroups, foods, servings, directionalStatements);

  useEffect(() => {
    if (Object.keys(familyPlans).length === 0) {
      navigate('/');
    }
  }, [familyPlans, navigate]);

  useEffect(() => {
    if (activeTab === 'menu' && familyMembers.length > 0) {
      setSelectedMember(familyMembers[0]);
    }
  }, [activeTab, familyMembers]);

  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMember(member);
    setActiveTab('menu');
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: 'menu' | 'shopping') => {
    setActiveTab(newValue);
    if (newValue === 'shopping') {
      setSelectedMember(null);
    }
  };

  const allFoods = useMemo(() => {
    const foods = Object.values(familyPlans).flatMap(plan => 
      Object.values(plan as Record<string, { foods: any[] }>).flatMap(group => group.foods)
    );
    console.log('All foods before passing to ShoppingList:', foods);
    return foods;
  }, [familyPlans]);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      {Object.keys(familyPlans).length > 0 ? (
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4 }}>
            Your Family's Personalized Daily Menu
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="Menu" value="menu" />
              <Tab label="Shopping List" value="shopping" />
            </Tabs>
          </Box>

          {activeTab === 'menu' && (
            <FamilyMemberSelector 
              familyMembers={familyMembers}
              selectedMember={selectedMember}
              onSelectMember={handleSelectMember}
            />
          )}

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
