import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { parseCSV } from './utils/csvParser';
import { FoodGroup, FoodItem, ServingRecommendation, DirectionalStatement, FamilyMember } from './types/foodGuide';
import { logger } from './utils/logger';
import { getFilePath } from './config';
import baseTheme from './theme';
import Alert from '@mui/material/Alert';

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

  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        ...baseTheme,
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Light mode colors
                primary: { main: '#2196f3' },
                secondary: { main: '#ff4081' },
                background: { default: '#f5f5f5', paper: '#ffffff' },
                text: { primary: '#333333', secondary: '#666666' },
              }
            : {
                // Updated dark mode colors
                primary: { main: '#64b5f6' },  // Lighter blue
                secondary: { main: '#ff80ab' },  // Lighter pink
                background: { default: '#121212', paper: '#1e1e1e' },
                text: { primary: '#ffffff', secondary: '#b0bec5' },
              }),
        },
      }),
    [mode],
  );

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
          <Header toggleColorMode={colorMode.toggleColorMode} />
          {error && <Alert severity="error">{error}</Alert>}
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
