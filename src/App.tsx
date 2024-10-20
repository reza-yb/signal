import React, { useEffect, useState } from 'react';
import { parseCSV } from './utils/csvParser';
import { FoodGroup, FoodItem, ServingRecommendation, DirectionalStatement } from './types/foodGuide';
import { logger } from './utils/logger';
import UserForm from './components/UserForm';
import { calculateDailyMenu } from './utils/menuCalculator';
import { getFilePath } from './config';

const App: React.FC = () => {
    const [foodGroups, setFoodGroups] = useState<FoodGroup[]>([]);
    const [foods, setFoods] = useState<FoodItem[]>([]);
    const [servings, setServings] = useState<ServingRecommendation[]>([]);
    const [directionalStatements, setDirectionalStatements] = useState<DirectionalStatement[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [userAge, setUserAge] = useState<number | null>(null);
    const [userGender, setUserGender] = useState<string | null>(null);
    const [dailyMenu, setDailyMenu] = useState<ReturnType<typeof calculateDailyMenu> | null>(null);

    useEffect(() => {
        const loadCSVData = async () => {
            try {
                logger.info('Starting to load CSV data...');

                const foodGroupData = await parseCSV<FoodGroup>(getFilePath('foodGroups'));
                logger.debug('Food Group Data:', foodGroupData);
                setFoodGroups(foodGroupData);

                const foodItemData = await parseCSV<FoodItem>(getFilePath('foods'));
                logger.debug('Food Item Data:', foodItemData);
                setFoods(foodItemData);

                const servingData = await parseCSV<ServingRecommendation>(getFilePath('servings'));
                logger.debug('Serving Data:', servingData);
                setServings(servingData);

                const statementData = await parseCSV<DirectionalStatement>(getFilePath('directionalStatements'));
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

    useEffect(() => {
        if (userAge && userGender && foodGroups.length && foods.length && servings.length && directionalStatements.length) {
            const menu = calculateDailyMenu(userAge, userGender, foodGroups, foods, servings, directionalStatements);
            setDailyMenu(menu);
        }
    }, [userAge, userGender, foodGroups, foods, servings, directionalStatements]);

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
                <div>
                    <h2>Daily Menu for age: {userAge}, gender: {userGender}</h2>
                    {dailyMenu && Object.entries(dailyMenu).map(([group, { servings, foods, directionalStatements }]) => (
                        <div key={group}>
                            <h3>{group}: {servings} servings</h3>
                            <ul>
                                {foods.map(({ food, servings }, index) => (
                                    <li key={index}>{food.food} - {food.srvg_sz} ({servings} serving{servings > 1 ? 's' : ''})</li>
                                ))}
                            </ul>
                            <h4>Directional Statements:</h4>
                            <ul>
                                {directionalStatements.map((statement, index) => (
                                    <li key={index}>{statement}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
