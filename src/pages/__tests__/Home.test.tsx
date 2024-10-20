import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Home Component', () => {
  const mockOnGeneratePlan = jest.fn();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Home onGeneratePlan={mockOnGeneratePlan} />
      </MemoryRouter>
    );
  });

  it('renders the title correctly', () => {
    expect(screen.getByText('Create Your Optimal Meal Plan')).toBeInTheDocument();
  });

  it('renders the family member form', () => {
    expect(screen.getByLabelText('Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Age *')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender *')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Family Member' })).toBeInTheDocument();
  });

  it('disables the generate plan button when no family members are added', () => {
    const generateButton = screen.getByRole('button', { name: 'Generate Personalized Plan' });
    expect(generateButton).toBeDisabled();
  });

  it('adds a family member when form is submitted', () => {
    fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Age *'), { target: { value: '30' } });
    const genderSelect = screen.getByLabelText('Gender *');
    fireEvent.mouseDown(genderSelect);
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText('Male')); // Changed from /male/i to 'Male'
    fireEvent.click(screen.getByRole('button', { name: 'Add Family Member' }));

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('30 years old, male')).toBeInTheDocument();
  });

  it('enables the generate plan button when a family member is added', () => {
    fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText('Age *'), { target: { value: '25' } });
    const genderSelect = screen.getByLabelText('Gender *');
    fireEvent.mouseDown(genderSelect);
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText('Female')); // Changed from /female/i to 'Female'
    fireEvent.click(screen.getByRole('button', { name: 'Add Family Member' }));

    const generateButton = screen.getByRole('button', { name: 'Generate Personalized Plan' });
    expect(generateButton).not.toBeDisabled();
  });

  it('calls onGeneratePlan and navigates when generate plan button is clicked', () => {
    fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'Bob' } });
    fireEvent.change(screen.getByLabelText('Age *'), { target: { value: '40' } });
    const genderSelect = screen.getByLabelText('Gender *');
    fireEvent.mouseDown(genderSelect);
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText('Male')); // Changed from /male/i to 'Male'
    fireEvent.click(screen.getByRole('button', { name: 'Add Family Member' }));

    fireEvent.click(screen.getByRole('button', { name: 'Generate Personalized Plan' }));

    expect(mockOnGeneratePlan).toHaveBeenCalledWith([{ name: 'Bob', age: 40, gender: 'male' }]);
    expect(mockNavigate).toHaveBeenCalledWith('/plan');
  });

  it('removes a family member when delete button is clicked', () => {
    fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText('Age *'), { target: { value: '35' } });
    const genderSelect = screen.getByLabelText('Gender *');
    fireEvent.mouseDown(genderSelect);
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText('Female')); // Changed from /female/i to 'Female'
    fireEvent.click(screen.getByRole('button', { name: 'Add Family Member' }));

    expect(screen.getByText('Alice')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Delete Alice' }));

    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
  });
});
