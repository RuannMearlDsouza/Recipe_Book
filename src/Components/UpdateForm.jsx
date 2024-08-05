import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useRecipeContext } from './RecipeContext';

const UpdateForm = ({ recipeData, onUpdate, onCancel,index}) => {
  const [updatedRecipeData, setUpdatedRecipeData] = useState(recipeData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to: ${value}`);
    setUpdatedRecipeData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      console.log('Updated Data:', updatedData);
      return updatedData;
    });
  };  

  const handleIngredientChange = (index, field, value) => {
    setUpdatedRecipeData((prevData) => {
      const updatedIngredients = [...prevData.ingredients];
      updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };

      delete updatedIngredients[index].name;
    
      const updatedData = { ...prevData, ingredients: updatedIngredients };
      console.log('Updated Data:', updatedData);
      return updatedData;
    });
  };
  
  const handleAddIngredient = () => {
    setUpdatedRecipeData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { quantity: '', unit: '', ingredient: '' }],
    }));
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...updatedRecipeData.ingredients];
    updatedIngredients.splice(index, 1);
    setUpdatedRecipeData((prevData) => ({ ...prevData, ingredients: updatedIngredients }));
  };

  const handleMethodChange = (index, field, value) => {
    setUpdatedRecipeData((prevData) => {
      const updatedMethod = [...prevData.method];
      if (!updatedMethod[index]) {
        updatedMethod[index] = { step: (index + 1).toString(), description: '' };
      }
      updatedMethod[index] = { ...updatedMethod[index], [field]: value };
      delete updatedMethod[index].name;
      const updatedData = { ...prevData, method: updatedMethod };
      console.log('Updated Data:', updatedData);
      return updatedData;
    });
  };

  const handleAddMethod = () => {
    const newStep = updatedRecipeData.method.length + 1;
    setUpdatedRecipeData((prevData) => ({
      ...prevData,
      method: [...prevData.method, { step: newStep.toString(), description: '' }],
    }));
  };

  const handleRemoveMethod = (index) => {
    const updatedMethod = [...updatedRecipeData.method];
    updatedMethod.splice(index, 1);

    updatedMethod.forEach((step, i) => {
      step.step = (i + 1).toString();
    });

    setUpdatedRecipeData((prevData) => ({ ...prevData, method: updatedMethod }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('UpdateForm - Updated Recipe Data:', updatedRecipeData);
    onUpdate(updatedRecipeData,index);
    updateLocalStorage(updatedRecipeData);
  };
  const updateLocalStorage = (updatedData) => {
    
    const existingRecipes = JSON.parse(localStorage.getItem('recipes')) || [];

    
    existingRecipes[index] = updatedData;

    
    localStorage.setItem('recipes', JSON.stringify(existingRecipes));
  };

  
  useEffect(() => {
    console.log("Recipe Data in UpdateForm:", recipeData);
    const updatedData = {
      ...recipeData,
      ingredients: recipeData.ingredients
        ? recipeData.ingredients.map((ingredient) => ({ ...ingredient }))
        : [{ quantity: '', unit: '', ingredient: '' }],
      method: Array.isArray(recipeData.method)
        ? recipeData.method.map((step) => {   const { name, ...stepWithoutName } = step;
        return { ...stepWithoutName };
      })
        : [{ step: '1', description: '' }],
    };
  
    setUpdatedRecipeData(updatedData);
  }, [recipeData]);
  
  console.log('UpdateForm - Rendering with Recipe Data:', recipeData);
  return (
    <form onSubmit={handleSubmit}>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        <b>Recipe Title:</b> <br /> <br />
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          type="text"
          name="title"
          value={updatedRecipeData.title || ''}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </label>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        <b>Image URL:</b> <br /> <br />
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          type="text"
          name="imageUrl"
          value={updatedRecipeData.imageUrl || ''}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </label>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        <b>Brief Description:</b> <br /> <br />
        <TextField
            id="outlined-basic"
            label=""
            variant="outlined"
            type="text"
            name="briefDescription"
            value={updatedRecipeData.briefDescription || ''}
            onChange={handleChange}
            style={{ width: '100%' }}
        />

      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        <b>Ingredients:</b> <br /> <br />
        {updatedRecipeData.ingredients &&
          updatedRecipeData.ingredients.map((ingredient, index) => (
            <div key={index} style={{ display: 'flex', marginBottom: '5px' }}>
              <TextField
                id={`quantity-${index}`}
                label="Quantity"
                variant="outlined"
                type="number"
                value={ingredient.quantity || ''}
                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                style={{ flex: 1, marginRight: '5px' }}
              />
              <Select
                id={`unit-${index}`}
                label="Unit"
                variant="outlined"
                value={ingredient.unit || ''}
                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                style={{ flex: 1, marginRight: '5px' }}
                inputProps={{
                  name: 'unit',
                  id: `unit-${index}`,
                }}
              >
                <MenuItem value="" disabled>
                  Select Unit
                </MenuItem>
                <MenuItem value="cup">Cup</MenuItem>
                <MenuItem value="gram">Gram</MenuItem>
                <MenuItem value="ounce">Ounce</MenuItem>
                <MenuItem value="teaspoon">Teaspoon</MenuItem>
                <MenuItem value="tablespoon">Tablespoon</MenuItem>
                <MenuItem value="litre">Litre</MenuItem>
                <MenuItem value="asRequired">As required</MenuItem>
              </Select>
              <TextField
                id={`ingredient-${index}`}
                label="Ingredient"
                variant="outlined"
                value={ingredient.ingredient || ''}
                onChange={(e) => handleIngredientChange(index, 'ingredient', e.target.value)}
                style={{ flex: 1, marginRight: '5px' }}
                InputProps={{
                  readOnly: false, 
                }}
                />
              <Button onClick={() => handleRemoveIngredient(index)} style={{ backgroundColor: '' }}>
                Remove
              </Button>
            </div>
          ))}
        <Button onClick={handleAddIngredient}>Add More</Button>
      </label>{' '}
      <br />

      <label style={{ display: 'block', marginBottom: '10px' }}>
        <b>Method:</b> <br /> <br />
        {updatedRecipeData.method &&
  updatedRecipeData.method.map((step, index) => (
    <div key={index} style={{ display: 'flex', marginBottom: '5px' }}>
      <div style={{ flex: 1, marginRight: '5px', marginTop: '15px' }}>{`Step ${step.step}`}</div>
      <TextField
        id={`description-${index}`}
        label=""
        variant="outlined"
        value={step.description || ''}
        onChange={(e) => handleMethodChange(index, 'description', e.target.value)}
        style={{ flex: 2, marginRight: '5px' }}
      />
      <Button onClick={() => handleRemoveMethod(index)}>Remove</Button>
    </div>
  ))}

      </label>{' '}
      <br />
      <Button type="submit" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Update Recipe
      </Button>
      <Button
        onClick={onCancel}
        style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
      >
        Cancel
      </Button>
    </form>
  );
};
export default UpdateForm;