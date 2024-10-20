import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { parseCSV } from './utils/csvParser';
import { FoodGroup, FoodItem, ServingRecommendation, DirectionalStatement, FamilyMember } from './types/foodGuide';
import { logger } from './utils/logger';
import { getFilePath } from './config';
import theme from './theme';

import Header from './components/Header';
import Home from './pages/Home';
import MyPlan from './pages/MyPlan';

const App: React.FC = () => {
  const [foodGroups, setFoodGroups] = useState<FoodGroup[]>([]);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [servings, setServings] = useState<ServingRecommendation[]>([]);
  const [directionalStatements, setDirectionalStatements] = useState<DirectionalStatement[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);

  useEffect(() => {
    const loadCSVData = async () => {
      try {
        logger.info('Starting to load CSV data...');

        const foodGroupData = await parseCSV<FoodGroup>(getFilePath('foodGroups'));
        setFoodGroups(foodGroupData);

        const foodItemData = await parseCSV<FoodItem>(getFilePath('foods'));
        setFoods(foodItemData);

        const servingData = await parseCSV<ServingRecommendation>(getFilePath('servings'));
        setServings(servingData);

        const statementData = await parseCSV<DirectionalStatement>(getFilePath('directionalStatements'));
        setDirectionalStatements(statementData);

        logger.info('All CSV data loaded successfully');
      } catch (error) {
        logger.error('Error loading CSV data:', error);
        setError(`Failed to load CSV data: ${error instanceof Error ? error.message : String(error)}`);
      }
    };

    loadCSVData();
  }, []);

  const generatePlan = (members: FamilyMember[]) => {
    setFamilyMembers(members);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          width: '100vw',
          bgcolor: 'background.default',
        }}>
          <Header />
          <Box component="main" sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column',
            p: 3,
            width: '100%',
          }}>
            <Routes>
              <Route path="/" element={<Home onGeneratePlan={generatePlan} />} />
              <Route path="/plan" element={<MyPlan familyMembers={familyMembers} foodGroups={foodGroups} foods={foods} servings={servings} directionalStatements={directionalStatements} />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
