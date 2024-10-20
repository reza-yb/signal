import React, { useEffect, useState } from 'react';
import { parseCSV } from './utils/csvParser';
import { FoodGroup, FoodItem, ServingRecommendation, DirectionalStatement } from './types/foodGuide';
import { logger } from './utils/logger';
import UserForm from './components/UserForm';

const App: React.FC = () => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [_foodGroups, setFoodGroups] = useState<FoodGroup[]>([]);
    const [_foods, setFoods] = useState<FoodItem[]>([]);
    const [_servings, setServings] = useState<ServingRecommendation[]>([]);
    const [_directionalStatements, setDirectionalStatements] = useState<DirectionalStatement[]>([]);
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [error, setError] = useState<string | null>(null);

    const [userAge, setUserAge] = useState<number | null>(null);
    const [userGender, setUserGender] = useState<string | null>(null);

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

    const handleFormSubmit = (age: number, gender: string) => {
        setUserAge(age);
        setUserGender(gender);
    };

    return (
        <div>
            <h1>Canada's Food Guide</h1>
            {error && <p>{error}</p>}
            <UserForm onSubmit={handleFormSubmit} />
            {userAge && userGender && (
                <p>
                    Showing menu for age: {userAge}, gender: {userGender}
                </p>
            )}
        </div>
    );
};

export default App;