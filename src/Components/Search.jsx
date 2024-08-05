
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useRecipeContext } from './RecipeContext';

const Search = ({ categories, selectedCategory, onSelectCategory, onSearch }) => {
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterButtonClick = () => {
    setFilterOpen(!filterOpen);
  };

  const { recipes } = useRecipeContext();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (input) => {
    setSearchInput(input);
    onSearch(input); 
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginBottom: '50px', gap: '30px' }}>
      <TextField
        id="outlined-basic"
        label="Search Recipes"
        variant="outlined"
        type="text"
        style={{ width: '600px', height: '50px', verticalAlign: 'top', marginRight: '20px' }}
        value={searchInput}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Link to="/new-recipe">
        <Button style={{ marginRight: '30px' }}>
          <AddCircleIcon style={{ fontSize: '40px' }} />
          <Typography variant="caption" style={{ marginLeft: '8px' }}>
            Add Recipe
          </Typography>
        </Button>
      </Link>
     
    </div>
  );
};

export default Search;