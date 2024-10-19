import { parseCSV } from './csvParser';

// Mock PapaParse's parse function to simulate reading CSV files
jest.mock('papaparse', () => ({
    parse: (filePath: string, config: any) => {
        config.complete({
            data: [
                { fgid: 'vf', foodgroup: 'Vegetables and Fruit', fgcat: 'Dark green vegetable' },
                { fgid: 'gf', foodgroup: 'Grain Products', fgcat: 'Whole grains' },
            ],
        });
    },
}));

describe('parseCSV', () => {
    it('should parse the CSV data correctly', async () => {
        const data = await parseCSV('/path/to/mock.csv');
        expect(data.length).toBe(2);
        expect(data[0].foodgroup).toBe('Vegetables and Fruit');
        expect(data[1].foodgroup).toBe('Grain Products');
    });

    it('should throw an error if parsing fails', async () => {
        jest.mock('papaparse', () => ({
            parse: (filePath: string, config: any) => {
                config.error(new Error('Failed to parse'));
            },
        }));

        try {
            await parseCSV('/path/to/failing.csv');
        } catch (error) {
            expect((error as Error).message).toBe('Failed to parse');
        }
    });
});
