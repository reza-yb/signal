import { parseCSV } from './csvParser';
import { FoodGroup, FoodItem, ServingRecommendation, DirectionalStatement } from '../types/foodGuide';
import { getFilePath } from '../config';

describe('parseCSV', () => {
    it('should parse FoodGroup CSV data correctly', async () => {
        const data = await parseCSV<FoodGroup>(getFilePath('foodGroups'));
        expect(data.length).toBeGreaterThan(0);
        expect(data[0]).toHaveProperty('foodgroup');
        expect(data[0]).toHaveProperty('fgid');
        expect(data[0]).toHaveProperty('fgcat');
    });

    it('should parse FoodItem CSV data correctly', async () => {
        const data = await parseCSV<FoodItem>(getFilePath('foods'));
        expect(data.length).toBeGreaterThan(0);
        expect(data[0]).toHaveProperty('food');
        expect(data[0]).toHaveProperty('fgid');
        expect(data[0]).toHaveProperty('srvg_sz');
    });

    it('should parse ServingRecommendation CSV data correctly', async () => {
        const data = await parseCSV<ServingRecommendation>(getFilePath('servings'));
        expect(data.length).toBeGreaterThan(0);
        expect(data[0]).toHaveProperty('gender');
        expect(data[0]).toHaveProperty('ages');
        expect(data[0]).toHaveProperty('servings');
    });

    it('should parse DirectionalStatement CSV data correctly', async () => {
        const data = await parseCSV<DirectionalStatement>(getFilePath('directionalStatements'));
        expect(data.length).toBeGreaterThan(0);
        expect(data[0]).toHaveProperty('directional-statement');
        expect(data[0]).toHaveProperty('fgid');
    });

    it('should throw an error if parsing fails', async () => {
        await expect(parseCSV<FoodGroup>('nonexistent.csv')).rejects.toThrow();
    });
});
