import { render, fireEvent } from '@testing-library/react';
import UserForm from './UserForm';

describe('UserForm', () => {
    it('submits the form with correct data', () => {
        const handleSubmit = jest.fn();
        const { getByLabelText, getByText } = render(<UserForm onSubmit={handleSubmit} />);

        fireEvent.change(getByLabelText(/Age:/i), { target: { value: '25' } });
        fireEvent.change(getByLabelText(/Gender:/i), { target: { value: 'Female' } });
        fireEvent.click(getByText(/Generate Menu/i));

        expect(handleSubmit).toHaveBeenCalledWith(25, 'Female');
    });
});
