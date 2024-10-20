import { FoodItem, FoodGroup } from './foodGuide';

export interface FamilyMember {
    name: string;
    age: number;
    gender: 'male' | 'female';
}

export interface FoodWithServings {
  food: FoodItem;
  servings: number;
}

// New interfaces extracted from components
export interface FoodGroupCardProps {
  foodGroup: FoodGroup;
  servings: number;
  foods: FoodWithServings[];
  directionalStatements: string[];
}

export interface HomeProps {
  onGeneratePlan: (members: FamilyMember[]) => void;
}

export interface ShoppingListProps {
  foods: FoodWithServings[];
}

export interface FoodListProps {
  items: FoodWithServings[];
}

export interface TipsListProps {
  tips: string[];
}
