import Papa from "papaparse";

interface CSVRow {
    [key: string]: string;
}

export const parseCSV = async (filePath: string): Promise<CSVRow[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(filePath, {
            download: true,
            header: true,
            complete: (results) => {
                resolve(results.data as CSVRow[]);
            },
            error: (error) => {
                reject(error);
            }
        });
    });
};
