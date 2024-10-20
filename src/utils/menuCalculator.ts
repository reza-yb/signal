import { FoodGroup, FoodItem, ServingRecommendation, DirectionalStatement } from '../types/foodGuide';

interface DailyMenu {
    [key: string]: {
        servings: number;
        foods: { food: FoodItem; servings: number }[];
        directionalStatements: string[];
    };
}

export function calculateDailyMenu(
    age: number,
    gender: string,
    foodGroups: FoodGroup[],
    foods: FoodItem[],
    servings: ServingRecommendation[],
    directionalStatements: DirectionalStatement[]
): DailyMenu {
    const dailyMenu: DailyMenu = {};

    // Find the appropriate serving recommendations for the user's age and gender
    const userServings = servings.filter(s => 
        s.gender.toLowerCase() === gender.toLowerCase() &&
        isAgeInRange(age, s.ages)
    );

    // Calculate servings for each food group
    for (const serving of userServings) {
        const foodGroup = foodGroups.find(fg => fg.fgid === serving.fgid);
        if (foodGroup) {
            const groupFoods = foods.filter(f => f.fgid === serving.fgid);
            const servingCount = parseServings(serving.servings);
            const statements = getDirectionalStatements(directionalStatements, serving.fgid);
            
            dailyMenu[foodGroup.foodgroup] = {
                servings: servingCount,
                foods: getOptimalFoods(groupFoods, servingCount, foodGroup),
                directionalStatements: statements
            };
        }
    }

    return dailyMenu;
}

function isAgeInRange(age: number, range: string): boolean {
    if (range.endsWith('+')) {
        const min = parseInt(range);
        return age >= min;
    }
    const [min, max] = range.split(' to ').map(Number);
    return age >= min && (isNaN(max) || age <= max);
}

function parseServings(servings: string): number {
    const [min, max] = servings.split(' to ').map(Number);
    return max ? Math.floor(Math.random() * (max - min + 1)) + min : min;
}

function getRandomFoods(foods: FoodItem[], count: number): { food: FoodItem; servings: number }[] {
    if (count <= 0 || foods.length === 0) return [];
    const result: { food: FoodItem; servings: number }[] = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * foods.length);
        const selectedFood = foods[randomIndex];
        const existingEntry = result.find(entry => entry.food.food === selectedFood.food);
        if (existingEntry) {
            existingEntry.servings++;
        } else {
            result.push({ food: selectedFood, servings: 1 });
        }
    }
    return result;
}

function getDirectionalStatements(directionalStatements: DirectionalStatement[], fgid: string): string[] {
    return directionalStatements
        .filter(ds => ds.fgid === fgid)
        .map(ds => ds["directional-statement"]);
}

function getOptimalFoods(foods: FoodItem[], count: number, foodGroup: FoodGroup): { food: FoodItem; servings: number }[] {
    let optimalFoods: { food: FoodItem; servings: number }[] = [];

    // Apply directional statements
    // at least one dark green and one orange, prioritize whole fruits and vegetables over juices
    if (foodGroup.fgid === 'vf') {
        const darkGreen = foods.filter(f => f.fgcat_id === '1');
        const orange = foods.filter(f => f.fgcat_id === '2');
        const fruits = foods.filter(f => !f.food.toLowerCase().includes('juice'));

        optimalFoods = [
            ...getRandomFoods(darkGreen, Math.min(1, count)),
            ...getRandomFoods(orange, Math.min(1, count))
        ];

        const remainingFruits = Math.ceil(count / 2) - optimalFoods.length;
        optimalFoods = [
            ...optimalFoods,
            ...getRandomFoods(fruits, remainingFruits)
        ];
    }

    // Prioritize whole grains
    else if (foodGroup.fgid === 'gr') {
        const wholeGrains = foods.filter(f => f.fgcat_id === '3');
        optimalFoods = getRandomFoods(wholeGrains, Math.ceil(count / 2));
    }

    // Drink skim milk every day
    else if (foodGroup.fgid === 'mi') {
        const skim = foods.filter(f => f.food.toLowerCase().includes('skim'));
        optimalFoods = getRandomFoods(skim, Math.min(1, count));
    }

    // Prioritize meat alternatives and eat at least two servings of fish every week
    else if (foodGroup.fgid === 'me') {
        const fish = foods.filter(f => f.food.toLowerCase().includes('fish'));
        const alternatives = foods.filter(f => f.fgcat_id === '7');

        if (Math.random() < 2/7) {
            optimalFoods = [
                ...getRandomFoods(fish, Math.min(1, count)),
                ...getRandomFoods(alternatives, Math.floor(count / 2))
            ];
        } else {
            optimalFoods = getRandomFoods(alternatives, Math.floor(count / 2));
        }

    }

    // Fill in the remaining with random foods
    optimalFoods = [
        ...optimalFoods,
        ...getRandomFoods(foods, count - optimalFoods.length),
    ]

    return optimalFoods;
}
