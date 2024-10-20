import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  styled,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FamilyMember } from '../types/foodGuide';

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  maxWidth: '400px',
  margin: '0 auto',
}));

const MemberCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

interface HomeProps {
  onGeneratePlan: (members: FamilyMember[]) => void;
}

const Home: React.FC<HomeProps> = ({ onGeneratePlan }) => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const navigate = useNavigate();

  const handleAddMember = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && age !== '' && gender) {
      const newMember: FamilyMember = { name, age: Number(age), gender };
      setFamilyMembers([...familyMembers, newMember]);
      setName('');
      setAge('');
      setGender('');
    }
  };

  const handleRemoveMember = (index: number) => {
    setFamilyMembers(familyMembers.filter((_, i) => i !== index));
  };

  const handleGeneratePlan = () => {
    if (familyMembers.length > 0) {
      onGeneratePlan(familyMembers);
      navigate('/plan');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Create Your Personalized Menu Plan
      </Typography>
      <StyledForm onSubmit={handleAddMember}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          required
          fullWidth
        />
        <FormControl fullWidth required>
          <InputLabel>Gender</InputLabel>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value as 'male' | 'female' | '')}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Family Member
        </Button>
      </StyledForm>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Family Members:
        </Typography>
        {familyMembers.map((member, index) => (
          <MemberCard key={index}>
            <CardContent>
              <Typography>{`${member.name} (${member.age}, ${member.gender})`}</Typography>
            </CardContent>
            <IconButton onClick={() => handleRemoveMember(index)}>
              <DeleteIcon />
            </IconButton>
          </MemberCard>
        ))}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Button
          onClick={handleGeneratePlan}
          variant="contained"
          color="primary"
          fullWidth
          disabled={familyMembers.length === 0}
        >
          Generate Personalized Plan
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
