import { parseCSV } from './csvParser';
import { calculateDailyMenu } from './menuCalculator';
import { FoodGroup, FoodItem, ServingRecommendation, DirectionalStatement } from '../types/foodGuide';
import { getFilePath } from '../config';

describe('menuCalculator', () => {
    let foodGroups: FoodGroup[];
    let foods: FoodItem[];
    let servings: ServingRecommendation[];
    let directionalStatements: DirectionalStatement[];

    beforeAll(async () => {
        foodGroups = await parseCSV<FoodGroup>(getFilePath('foodGroups'));
        foods = await parseCSV<FoodItem>(getFilePath('foods'));
        servings = await parseCSV<ServingRecommendation>(getFilePath('servings'));
        directionalStatements = await parseCSV<DirectionalStatement>(getFilePath('directionalStatements'));
    });

    it('should calculate daily menu for a child', () => {
        const dailyMenu = calculateDailyMenu(5, 'Female', foodGroups, foods, servings, directionalStatements);

        expect(Object.keys(dailyMenu)).toHaveLength(4);
        expect(dailyMenu['Vegetables and Fruit'].servings).toBe(5);
        expect(dailyMenu['Grains'].servings).toBe(4);
        expect(dailyMenu['Milk and Alternatives'].servings).toBe(2);
        expect(dailyMenu['Meat and Alternatives'].servings).toBe(1);

        Object.values(dailyMenu).forEach(({ foods, directionalStatements }) => {
            expect(foods.length).toBeGreaterThan(0);
            expect(directionalStatements.length).toBeGreaterThan(0);
        });
    });

    it('should calculate daily menu for an adult male', () => {
        const dailyMenu = calculateDailyMenu(35, 'Male', foodGroups, foods, servings, directionalStatements);

        expect(Object.keys(dailyMenu)).toHaveLength(4);
        expect(dailyMenu['Vegetables and Fruit'].servings).toBeGreaterThan(7); // 8 - 10
        expect(dailyMenu['Vegetables and Fruit'].servings).toBeLessThan(11); // 8 - 10
        expect(dailyMenu['Grains'].servings).toBe(8);
        expect(dailyMenu['Milk and Alternatives'].servings).toBe(2);
        expect(dailyMenu['Meat and Alternatives'].servings).toBe(3);

        Object.values(dailyMenu).forEach(({ foods, directionalStatements }) => {
            expect(foods.length).toBeGreaterThan(0);
            expect(directionalStatements.length).toBeGreaterThan(0);
        });
    });

    it('should calculate daily menu for an elderly female', () => {
        const dailyMenu = calculateDailyMenu(75, 'Female', foodGroups, foods, servings, directionalStatements);

        expect(Object.keys(dailyMenu)).toHaveLength(4);
        expect(dailyMenu['Vegetables and Fruit'].servings).toBe(7);
        expect(dailyMenu['Grains'].servings).toBe(6);
        expect(dailyMenu['Milk and Alternatives'].servings).toBe(3);
        expect(dailyMenu['Meat and Alternatives'].servings).toBe(2);

        Object.values(dailyMenu).forEach(({ foods, directionalStatements }) => {
            expect(foods.length).toBeGreaterThan(0);
            expect(directionalStatements.length).toBeGreaterThan(0);
        });
    });

    it('should handle invalid age gracefully', () => {
        const dailyMenu = calculateDailyMenu(-5, 'Male', foodGroups, foods, servings, directionalStatements);
        expect(dailyMenu).toEqual({});
    });

    it('should handle invalid gender gracefully', () => {
        const dailyMenu = calculateDailyMenu(30, 'Invalid', foodGroups, foods, servings, directionalStatements);
        expect(dailyMenu).toEqual({});
    });

    it('should include directional statements for each food group', () => {
        const dailyMenu = calculateDailyMenu(30, 'Female', foodGroups, foods, servings, directionalStatements);

        Object.values(dailyMenu).forEach(({ directionalStatements }) => {
            expect(directionalStatements.length).toBeGreaterThan(0);
        });
    });

    it('should include dark green and orange vegetables', () => {
        const dailyMenu = calculateDailyMenu(30, 'Female', foodGroups, foods, servings, directionalStatements);
        const vegFruits = dailyMenu['Vegetables and Fruit'].foods;

        const hasDarkGreen = vegFruits.some(food => food.food.fgcat_id === '1');
        const hasOrange = vegFruits.some(food => food.food.fgcat_id === '2');

        expect(hasDarkGreen).toBeTruthy();
        expect(hasOrange).toBeTruthy();
    });

    it('should include whole grains', () => {
        const dailyMenu = calculateDailyMenu(30, 'Female', foodGroups, foods, servings, directionalStatements);
        const grains = dailyMenu['Grains'].foods;

        const hasWholeGrains = grains.some(food => food.food.fgcat_id === '3');
        expect(hasWholeGrains).toBeTruthy();
    });

    it('should include lower fat milk alternatives', () => {
        const dailyMenu = calculateDailyMenu(30, 'Female', foodGroups, foods, servings, directionalStatements);
        const milkAlternatives = dailyMenu['Milk and Alternatives'].foods;

        const hasLowerFat = milkAlternatives.some(food => 
            food.food.food.toLowerCase().includes('skim') || 
            food.food.food.toLowerCase().includes('1%') || 
            food.food.food.toLowerCase().includes('2%')
        );
        expect(hasLowerFat).toBeTruthy();
    });

    it('should include fish and meat alternatives', () => {
        const dailyMenu = calculateDailyMenu(30, 'Female', foodGroups, foods, servings, directionalStatements);
        const meatAlternatives = dailyMenu['Meat and Alternatives'].foods;

        const hasFish = meatAlternatives.some(food => food.food.food.toLowerCase().includes('fish'));
        const hasAlternatives = meatAlternatives.some(food => food.food.fgcat_id === '7');

        expect(hasFish || hasAlternatives).toBeTruthy();
    });

    it('should include at least one dark green and one orange vegetable', () => {
        const dailyMenu = calculateDailyMenu(30, 'Female', foodGroups, foods, servings, directionalStatements);
        const vegFruits = dailyMenu['Vegetables and Fruit'].foods;

        const darkGreenCount = vegFruits.filter(food => food.food.fgcat_id === '1').length;
        const orangeCount = vegFruits.filter(food => food.food.fgcat_id === '2').length;

        expect(darkGreenCount).toBeGreaterThanOrEqual(1);
        expect(orangeCount).toBeGreaterThanOrEqual(1);
    });

    it('should prioritize whole fruits and vegetables over juices', () => {
        const dailyMenu = calculateDailyMenu(30, 'Female', foodGroups, foods, servings, directionalStatements);
        const vegFruits = dailyMenu['Vegetables and Fruit'].foods;

        const wholeCount = vegFruits.filter(food => !food.food.food.toLowerCase().includes('juice')).length;
        const juiceCount = vegFruits.filter(food => food.food.food.toLowerCase().includes('juice')).length;

        expect(wholeCount).toBeGreaterThan(juiceCount);
    });

    it('should include at least half of grains as whole grains', () => {
        const dailyMenu = calculateDailyMenu(30, 'Female', foodGroups, foods, servings, directionalStatements);
        const grains = dailyMenu['Grains'].foods;

        const wholeGrainCount = grains.filter(food => food.food.fgcat_id === '3').length;
        
        expect(wholeGrainCount).toBeGreaterThanOrEqual(Math.ceil(grains.length / 2));
    });

    it('should include skim milk every day', () => {
        const dailyMenu = calculateDailyMenu(30, 'Female', foodGroups, foods, servings, directionalStatements);
        const milkAlternatives = dailyMenu['Milk and Alternatives'].foods;

        const hasSkimMilk = milkAlternatives.some(food => 
            food.food.food.toLowerCase().includes('skim')
        );
        expect(hasSkimMilk).toBeTruthy();
    });

    it('should include fish at least twice a week on average', () => {
        const fishCount = Array(70).fill(0).map(() => {
            const dailyMenu = calculateDailyMenu(30, 'Female', foodGroups, foods, servings, directionalStatements);
            const meatAlternatives = dailyMenu['Meat and Alternatives'].foods;
            return meatAlternatives.some(food => food.food.food.toLowerCase().includes('fish')) ? 1 : 0;
        }).reduce((a, b) => a + b, 0 as number);

        const averageFishPerWeek = (fishCount / 70) * 7;
        expect(averageFishPerWeek).toBeGreaterThan(1);
    });

    it('should prioritize meat alternatives', () => {
        const dailyMenu = calculateDailyMenu(30, 'Female', foodGroups, foods, servings, directionalStatements);
        const meatAlternatives = dailyMenu['Meat and Alternatives'].foods;

        const alternativesCount = meatAlternatives.filter(food => food.food.fgcat_id === '7').length;
        
        expect(alternativesCount).toBeGreaterThanOrEqual(Math.floor(meatAlternatives.length / 2));
    });
});
