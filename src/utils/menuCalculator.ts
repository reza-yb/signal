import { FoodGroup, FoodItem, ServingRecommendation } from '../types/foodGuide';

interface DailyMenu {
    [key: string]: {
        servings: number;
        foods: FoodItem[];
    };
}

export function calculateDailyMenu(
    age: number,
    gender: string,
    foodGroups: FoodGroup[],
    foods: FoodItem[],
    servings: ServingRecommendation[]
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
            
            dailyMenu[foodGroup.foodgroup] = {
                servings: servingCount,
                foods: getRandomFoods(groupFoods, servingCount)
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
    return max ? (min + max) / 2 : min;
}

function getRandomFoods(foods: FoodItem[], count: number): FoodItem[] {
    const shuffled = [...foods].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, foods.length));
}
