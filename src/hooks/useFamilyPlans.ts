import { useMemo } from 'react';
import { FamilyMember, FoodGroup, FoodItem, ServingRecommendation, DirectionalStatement } from '../types/foodGuide';
import { calculateDailyMenu } from '../utils/menuCalculator';

export const useFamilyPlans = (
  familyMembers: FamilyMember[],
  foodGroups: FoodGroup[],
  foods: FoodItem[],
  servings: ServingRecommendation[],
  directionalStatements: DirectionalStatement[]
) => {
  return useMemo(() => {
    return familyMembers.reduce((plans, member) => {
      plans[member.name] = calculateDailyMenu(member.age, member.gender, foodGroups, foods, servings, directionalStatements);
      return plans;
    }, {} as Record<string, FamilyMemberPlan>);
  }, [familyMembers, foodGroups, foods, servings, directionalStatements]);
};
