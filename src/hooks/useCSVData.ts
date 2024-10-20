import { useState, useEffect } from 'react';
import { parseCSV } from '../utils/csvParser';
import { getFilePath } from '../config';
import { FoodGroup, FoodItem, ServingRecommendation, DirectionalStatement } from '../types/foodGuide';
import { logger } from '../utils/logger';

export const useCSVData = () => {
  const [foodGroups, setFoodGroups] = useState<FoodGroup[]>([]);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [servings, setServings] = useState<ServingRecommendation[]>([]);
  const [directionalStatements, setDirectionalStatements] = useState<DirectionalStatement[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  return { foodGroups, foods, servings, directionalStatements, error };
};

