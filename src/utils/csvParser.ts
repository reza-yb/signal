import Papa from "papaparse";
import { getFileReader } from './fileReader';

export const parseCSV = async <T>(filePath: string): Promise<T[]> => {
    try {
        const fileReader = getFileReader();
        const fileContent = await fileReader.readFile(filePath);
        return new Promise<T[]>((resolve, reject) => {
            Papa.parse<T>(fileContent, {
                header: true,
                transformHeader: (header: string) => header.trim(),
                transform: (value: string) => value.trim(),
                complete: (results) => {
                    resolve(results.data);
                },
                error: (error: Error) => {
                    reject(error);
                }
            });
        });
    } catch (error) {
        throw new Error(`Failed to read or parse CSV file: ${error}`);
    }
};
