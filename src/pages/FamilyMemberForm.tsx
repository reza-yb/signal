import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { FamilyMember } from '../types/foodGuide';
import { styled } from '@mui/material/styles';
const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    maxWidth: '500px',
    margin: '0 auto',
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
  }));

interface FamilyMemberFormProps {
  onAddMember: (member: FamilyMember) => void;
}

const FamilyMemberForm: React.FC<FamilyMemberFormProps> = ({ onAddMember }) => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && age !== '' && gender) {
      const ageNumber = parseInt(age, 10);
      onAddMember({ name, age: ageNumber, gender });
      setName('');
      setAge('');
      setGender('');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        inputProps={{ maxLength: 10 }}
        helperText="Max 10 characters"
      />
      <TextField
        label="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
        fullWidth
        inputProps={{ min: 2, max: 100 }}
        helperText="Must be 2 or older"
      />
      <FormControl fullWidth required>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          value={gender}
          onChange={(e) => setGender(e.target.value as 'male' | 'female' | '')}
          label="Gender"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth 
        size="large"
        startIcon={<PersonAddIcon />}
      >
        Add Family Member
      </Button>
    </StyledForm>
  );
};

export default FamilyMemberForm;
