import React, { useEffect, useState } from 'react';
import { parseCSV } from './utils/csvParser';
import { FoodGroup, FoodItem, ServingRecommendation, DirectionalStatement } from './types/foodGuide';
import { logger } from './utils/logger';

const App: React.FC = () => {
    const [foodGroups, setFoodGroups] = useState<FoodGroup[]>([]);
    const [foods, setFoods] = useState<FoodItem[]>([]);
    const [servings, setServings] = useState<ServingRecommendation[]>([]);
    const [directionalStatements, setDirectionalStatements] = useState<DirectionalStatement[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCSVData = async () => {
            try {
                logger.info('Starting to load CSV data...');

                const foodGroupData = await parseCSV<FoodGroup>('./data/foodgroups-en_ONPP.csv');
                logger.debug('Food Group Data:', foodGroupData);
                setFoodGroups(foodGroupData);

                const foodItemData = await parseCSV<FoodItem>('./data/foods-en_ONPP_rev.csv');
                logger.debug('Food Item Data:', foodItemData);
                setFoods(foodItemData);

                const servingData = await parseCSV<ServingRecommendation>('./data/servings_per_day-en_ONPP.csv');
                logger.debug('Serving Data:', servingData);
                setServings(servingData);

                const statementData = await parseCSV<DirectionalStatement>('./data/fg_directional_statements-en_ONPP.csv');
                logger.debug('Statement Data:', statementData);
                setDirectionalStatements(statementData);

                logger.info('All CSV data loaded successfully');
            } catch (error) {
                logger.error('Error loading CSV data:', error);
                setError(`Failed to load CSV data: ${error instanceof Error ? error.message : String(error)}`);
            }
        };

        loadCSVData();
    }, []);

    return (
        <div>
            <h1>Canada's Food Guide</h1>
            {error && <p>{error}</p>}
            <h2>Food Groups</h2>
            <ul>
                {foodGroups.map((group, index) => (
                    <li key={index}>{group.foodgroup}</li>
                ))}
            </ul>
            <h2>Food Items</h2>
            <ul>
                {foods.map((food, index) => (
                    <li key={index}>{food.food}</li>
                ))}
            </ul>
            <h2>Serving Recommendations</h2>
            <ul>
                {servings.map((serving, index) => (
                    <li key={index}>{serving.gender}: {serving.servings} servings</li>
                ))}
            </ul>
            <h2>Directional Statements</h2>
            <ul>
                {directionalStatements.map((statement, index) => (
                    <li key={index}>{statement['directional-statement']}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
