import React, { useEffect, useState } from 'react';
import { parseCSV } from './utils/csvParser';

const App: React.FC = () => {
    const [foodGroups, setFoodGroups] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCSVData = async () => {
            try {
                const data = await parseCSV('/data/foodgroups-en_ONPP.csv');
                setFoodGroups(data);
            } catch (error) {
                setError('Failed to load CSV data.');
            }
        };

        loadCSVData();
    }, []);

    return (
        <div>
            <h1>Canada's Food Guide</h1>
            {error && <p>{error}</p>}
            <ul>
                {foodGroups.map((group, index) => (
                    <li key={index}>{group.foodgroup}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
