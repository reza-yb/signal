import { parseCSV } from './csvParser';
import { calculateDailyMenu } from './menuCalculator';
import { FoodGroup, FoodItem, ServingRecommendation } from '../types/foodGuide';
import { getFilePath } from '../config';

describe('menuCalculator', () => {
    let foodGroups: FoodGroup[];
    let foods: FoodItem[];
    let servings: ServingRecommendation[];

    beforeAll(async () => {
        foodGroups = await parseCSV<FoodGroup>(getFilePath('foodGroups'));
        foods = await parseCSV<FoodItem>(getFilePath('foods'));
        servings = await parseCSV<ServingRecommendation>(getFilePath('servings'));
    });

    it('should calculate daily menu for a child', () => {
        const dailyMenu = calculateDailyMenu(5, 'Female', foodGroups, foods, servings);

        expect(Object.keys(dailyMenu)).toHaveLength(4);
        expect(dailyMenu['Vegetables and Fruit'].servings).toBe(5);
        expect(dailyMenu['Grains'].servings).toBe(4);
        expect(dailyMenu['Milk and Alternatives'].servings).toBe(2);
        expect(dailyMenu['Meat and Alternatives'].servings).toBe(1);

        Object.values(dailyMenu).forEach(({ foods }) => {
            expect(foods.length).toBeGreaterThan(0);
        });
    });

    it('should calculate daily menu for an adult male', () => {
        const dailyMenu = calculateDailyMenu(35, 'Male', foodGroups, foods, servings);

        expect(Object.keys(dailyMenu)).toHaveLength(4);
        expect(dailyMenu['Vegetables and Fruit'].servings).toBe(9); // Average of 8 to 10
        expect(dailyMenu['Grains'].servings).toBe(8);
        expect(dailyMenu['Milk and Alternatives'].servings).toBe(2);
        expect(dailyMenu['Meat and Alternatives'].servings).toBe(3);

        Object.values(dailyMenu).forEach(({ foods }) => {
            expect(foods.length).toBeGreaterThan(0);
        });
    });

    it('should calculate daily menu for an elderly female', () => {
        const dailyMenu = calculateDailyMenu(75, 'Female', foodGroups, foods, servings);

        expect(Object.keys(dailyMenu)).toHaveLength(4);
        expect(dailyMenu['Vegetables and Fruit'].servings).toBe(7);
        expect(dailyMenu['Grains'].servings).toBe(6);
        expect(dailyMenu['Milk and Alternatives'].servings).toBe(3);
        expect(dailyMenu['Meat and Alternatives'].servings).toBe(2);

        Object.values(dailyMenu).forEach(({ foods }) => {
            expect(foods.length).toBeGreaterThan(0);
        });
    });

    it('should handle invalid age gracefully', () => {
        const dailyMenu = calculateDailyMenu(-5, 'Male', foodGroups, foods, servings);
        expect(dailyMenu).toEqual({});
    });

    it('should handle invalid gender gracefully', () => {
        const dailyMenu = calculateDailyMenu(30, 'Invalid', foodGroups, foods, servings);
        expect(dailyMenu).toEqual({});
    });
});
