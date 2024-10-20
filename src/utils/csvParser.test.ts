import { parseCSV } from './csvParser';
import { FoodGroup, FoodItem, ServingRecommendation, DirectionalStatement } from '../types/foodGuide';
import path from 'path';

const dataDir = path.join(__dirname, '..', '..', 'public', 'data');

describe('parseCSV', () => {
    it('should parse FoodGroup CSV data correctly', async () => {
        const data = await parseCSV<FoodGroup>(path.join(dataDir, 'foodgroups-en_ONPP.csv'));
        expect(data.length).toBeGreaterThan(0);
        expect(data[0]).toHaveProperty('foodgroup');
        expect(data[0]).toHaveProperty('fgid');
        expect(data[0]).toHaveProperty('fgcat');
    });

    it('should parse FoodItem CSV data correctly', async () => {
        const data = await parseCSV<FoodItem>(path.join(dataDir, 'foods-en_ONPP_rev.csv'));
        expect(data.length).toBeGreaterThan(0);
        expect(data[0]).toHaveProperty('food');
        expect(data[0]).toHaveProperty('fgid');
        expect(data[0]).toHaveProperty('srvg_sz');
    });

    it('should parse ServingRecommendation CSV data correctly', async () => {
        const data = await parseCSV<ServingRecommendation>(path.join(dataDir, 'servings_per_day-en_ONPP.csv'));
        expect(data.length).toBeGreaterThan(0);
        expect(data[0]).toHaveProperty('gender');
        expect(data[0]).toHaveProperty('ages');
        expect(data[0]).toHaveProperty('servings');
    });

    it('should parse DirectionalStatement CSV data correctly', async () => {
        const data = await parseCSV<DirectionalStatement>(path.join(dataDir, 'fg_directional_statements-en_ONPP.csv'));
        expect(data.length).toBeGreaterThan(0);
        expect(data[0]).toHaveProperty('directional-statement');
        expect(data[0]).toHaveProperty('fgid');
    });

    it('should throw an error if parsing fails', async () => {
        await expect(parseCSV<FoodGroup>(path.join(dataDir, 'nonexistent.csv'))).rejects.toThrow();
    });
});
