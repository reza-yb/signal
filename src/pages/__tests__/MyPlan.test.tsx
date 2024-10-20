import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyPlan from '../MyPlan';
import { useFamilyPlans } from '../../hooks/useFamilyPlans';
import { FamilyMember, FoodGroup, FoodItem, ServingRecommendation, DirectionalStatement } from '../../types/foodGuide';
import { FamilyMemberPlan } from '../../types/props';
import '@testing-library/jest-dom';

// Mock the useFamilyPlans hook
jest.mock('../../hooks/useFamilyPlans');

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockFamilyMembers: FamilyMember[] = [
  { name: 'John', age: 35, gender: 'male' },
  { name: 'Jane', age: 32, gender: 'female' },
];

const mockFoodGroups: FoodGroup[] = [
  { fgid: '1', foodgroup: 'Vegetables', fgcat: 'Veggies' },
  { fgid: '2', foodgroup: 'Fruits', fgcat: 'Fruits' },
  { fgid: '3', foodgroup: 'Grains', fgcat: 'Grains' },
];

const mockFoods: FoodItem[] = [
  { fgid: '2', fgcat_id: '1', food: 'Apple', srvg_sz: '1 medium' },
  { fgid: '1', fgcat_id: '1', food: 'Broccoli', srvg_sz: '1/2 cup' },
];

const mockServings: ServingRecommendation[] = [
  { fgid: '2', gender: 'male', ages: '31-50', servings: '2' },
  { fgid: '1', gender: 'male', ages: '31-50', servings: '3' },
];

const mockDirectionalStatements: DirectionalStatement[] = [
  { fgid: '2', "directional-statement": 'Eat more fruits' },
  { fgid: '1', "directional-statement": 'Increase vegetable intake' },
];

const mockFamilyPlans: Record<string, FamilyMemberPlan> = {
  John: {
    Fruits: { 
      servings: 2,
      foods: [{ food: { fgid: '2', fgcat_id: '1', food: 'Apple', srvg_sz: '1 medium' }, servings: 2 }],
      directionalStatements: ['Eat more fruits'],
    },
    Vegetables: { 
      servings: 3,
      foods: [{ food: { fgid: '1', fgcat_id: '1', food: 'Broccoli', srvg_sz: '1/2 cup' }, servings: 3 }],
      directionalStatements: ['Increase vegetable intake'],
    },
  },
  Jane: {
    Fruits: { 
      servings: 2,
      foods: [{ food: { fgid: '2', fgcat_id: '1', food: 'Banana', srvg_sz: '1 medium' }, servings: 2 }],
      directionalStatements: ['Eat more fruits'],
    },
    Vegetables: { 
      servings: 3,
      foods: [{ food: { fgid: '1', fgcat_id: '1', food: 'Carrot', srvg_sz: '1/2 cup' }, servings: 3 }],
      directionalStatements: ['Increase vegetable intake'],
    },
  },
};

describe('MyPlan Component', () => {
  beforeEach(() => {
    (useFamilyPlans as jest.Mock).mockReturnValue(mockFamilyPlans);
  });

  it('renders the component with menu tab selected by default', () => {
    render(
      <MemoryRouter>
        <MyPlan
          familyMembers={mockFamilyMembers}
          foodGroups={mockFoodGroups}
          foods={mockFoods}
          servings={mockServings}
          directionalStatements={mockDirectionalStatements}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Your Family\'s Personalized Daily Menu')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Menu' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Shopping List' })).toHaveAttribute('aria-selected', 'false');
  });

  it('switches to shopping list tab when clicked', () => {
    render(
      <MemoryRouter>
        <MyPlan
          familyMembers={mockFamilyMembers}
          foodGroups={mockFoodGroups}
          foods={mockFoods}
          servings={mockServings}
          directionalStatements={mockDirectionalStatements}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('tab', { name: 'Shopping List' }));
    expect(screen.getByRole('tab', { name: 'Shopping List' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Menu' })).toHaveAttribute('aria-selected', 'false');
  });

  it('displays family member selector in menu tab', () => {
    render(
      <MemoryRouter>
        <MyPlan
          familyMembers={mockFamilyMembers}
          foodGroups={mockFoodGroups}
          foods={mockFoods}
          servings={mockServings}
          directionalStatements={mockDirectionalStatements}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  it('navigates to home page when no family plans are available', () => {
    (useFamilyPlans as jest.Mock).mockReturnValue({});

    render(
      <MemoryRouter>
        <MyPlan
          familyMembers={mockFamilyMembers}
          foodGroups={mockFoodGroups}
          foods={mockFoods}
          servings={mockServings}
          directionalStatements={mockDirectionalStatements}
        />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
