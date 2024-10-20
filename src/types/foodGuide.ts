// Interface for each row of food groups CSV
export interface FoodGroup {
    fgid: string;
    foodgroup: string;
    fgcat: string;
}

// Interface for each row of foods CSV
export interface FoodItem {
    fgid: string;
    fgcat_id: string;
    food: string;
    srvg_sz: string;
}

// Interface for each row of servings per day CSV
export interface ServingRecommendation {
    fgid: string;
    gender: string;
    ages: string;
    servings: string;
}

// Interface for the directional statements CSV
export interface DirectionalStatement {
    fgid: string;
    "directional-statement": string;
}
