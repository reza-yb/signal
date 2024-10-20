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
                transform: (value: string) => {
                    const cleanedValue = value.trim();
                    return cleanedValue.replace(/�/g, "1/2");
                },
                complete: (results) => {
                    const filteredData = results.data.filter(row => 
                        Object.values(row as Record<string, unknown>).some(value => value !== "")
                    );
                    resolve(filteredData);
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
