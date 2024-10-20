import React, { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline, Alert, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCSVData } from './hooks/useCSVData';
import { lightTheme, darkTheme } from './theme';
import Header from './components/Header';
import Home from './pages/Home';
import MyPlan from './pages/MyPlan';
import { FamilyMember } from './types/foodGuide';

const App: React.FC = () => {
  const { foodGroups, foods, servings, directionalStatements, error } = useCSVData();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(() => mode === 'light' ? lightTheme : darkTheme, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

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
          <Header toggleColorMode={toggleColorMode} />
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
