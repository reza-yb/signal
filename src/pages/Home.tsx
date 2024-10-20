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
  Paper,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { HomeProps, FamilyMember } from '../types/shared';

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

const MemberCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
}));

const Home: React.FC<HomeProps> = ({ onGeneratePlan }) => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const navigate = useNavigate();

  const handleAddMember = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && age !== '' && gender) {
      const ageNumber = parseInt(age, 10);
      if (familyMembers.some(member => member.name.toLowerCase() === name.toLowerCase())) {
        alert('Name must be unique');
        return;
      }

      const newMember: FamilyMember = { name, age: ageNumber, gender };
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
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Avatar sx={{ margin: 'auto', bgcolor: 'primary.main', width: 60, height: 60 }}>
          <RestaurantIcon fontSize="large" />
        </Avatar>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
          Create Your Optimal Meal Plan
        </Typography>
      </Box>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <StyledForm onSubmit={handleAddMember}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            slotProps={{
              input: {
                inputProps: {
                  maxLength: 10,
                },
              },
            }}
            helperText="Max 10 characters"
          />
          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            fullWidth
            variant="outlined"
            slotProps={{
              input: {
                inputProps: {
                  min: 2,
                  max: 100,
                },
              },
            }}
            helperText="Must be 2 or older"
          />
          <FormControl fullWidth required variant="outlined">
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

        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Family Members:
          </Typography>
          {familyMembers.map((member, index) => (
            <MemberCard key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StyledAvatar>{member.name[0].toUpperCase()}</StyledAvatar>
                <CardContent>
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{`${member.age} years old, ${member.gender}`}</Typography>
                </CardContent>
              </Box>
              <IconButton onClick={() => handleRemoveMember(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </MemberCard>
          ))}
        </Box>

        <Box sx={{ mt: 6 }}>
          <Button
            onClick={handleGeneratePlan}
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            disabled={familyMembers.length === 0}
            sx={{ py: 2 }}
          >
            Generate Personalized Plan
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
