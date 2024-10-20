import React, { useState } from 'react';

interface UserFormProps {
    onSubmit: (age: number, gender: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
    const [age, setAge] = useState<number>(0);
    const [gender, setGender] = useState<string>('Male');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(age, gender);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="age">Age:</label>
                <input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    required
                />
            </div>
            <div>
                <label htmlFor="gender">Gender:</label>
                <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <button type="submit">Generate Menu</button>
        </form>
    );
};

export default UserForm;
