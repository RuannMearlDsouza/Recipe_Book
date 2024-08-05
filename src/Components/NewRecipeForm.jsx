import React, { useState } from 'react';
import { useRecipeContext } from './RecipeContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const NewRecipeForm = () => {
  const { addRecipe } = useRecipeContext();
  const navigate = useNavigate();

  const [recipeData, setRecipeData] = useState({
    title: '',
    imageUrl: '',
    ingredients: [{ quantity: '', unit: '', ingredient: '' }],
    briefDescription: '',
    method: [{ step: '1', description: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: name === 'ingredients' ? JSON.parse(value) : value,
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients[index][field] = value;
    setRecipeData((prevData) => ({ ...prevData, ingredients: updatedIngredients }));
  };

  const handleAddIngredient = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { quantity: '', unit: '', ingredient: '' }],
    }));
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients.splice(index, 1);
    setRecipeData((prevData) => ({ ...prevData, ingredients: updatedIngredients }));
  };

  const handleMethodChange = (index, field, value) => {
    const updatedMethod = [...recipeData.method];
    updatedMethod[index][field] = value;
    setRecipeData((prevData) => ({ ...prevData, method: updatedMethod }));
  };

  const handleAddMethod = () => {
    const newStep = recipeData.method.length + 1;
    setRecipeData((prevData) => ({
      ...prevData,
      method: [...prevData.method, { step: newStep.toString(), description: '' }],
    }));
  };

  const handleRemoveMethod = (index) => {
    const updatedMethod = [...recipeData.method];
    updatedMethod.splice(index, 1);

    updatedMethod.forEach((step, i) => {
      step.step = (i + 1).toString();
    });

    setRecipeData((prevData) => ({ ...prevData, method: updatedMethod }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Recipe data submitted:', recipeData);

    addRecipe(recipeData);

    setRecipeData({
      title: '',
      imageUrl: '',
      ingredients: [{ quantity: '', unit: '', ingredient: '' }],
      briefDescription: '',
      method: [{ step: '1', description: '' }],
    });
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden', width: '600px', backgroundColor: 'lightyellow', padding: '20px', maxHeight: '80vh', overflowY: 'auto' }}>
        <h1 style={{ textAlign: 'center', marginTop: '10px' }}>New Recipe Form</h1>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            <b>Recipe Title:</b> <br /> <br />
            <TextField id="outlined-basic" label="" variant="outlined" type="text" name="title" value={recipeData.title} onChange={handleChange} style={{ width: '100%' }} />
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            <b>Image URL:</b> <br /> <br />
            <TextField id="outlined-basic" label="" variant="outlined" type='url' name="imageUrl" value={recipeData.imageUrl} onChange={handleChange} style={{ width: '100%' }} />
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            <b>Brief Description:</b> <br /> <br />
            <TextField id="outlined-basic" label="" variant="outlined" type='text' name="briefDescription" value={recipeData.briefDescription} onChange={handleChange} style={{ width: '100%' }} />
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            <b>Ingredients:</b> <br /> <br />
            {recipeData.ingredients.map((ingredient, index) => (
              <div key={index} style={{ display: 'flex', marginBottom: '5px' }}>
                <TextField
                  id={`quantity-${index}`}
                  label="Quantity"
                  variant="outlined"
                  type="number"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  style={{ flex: 1, marginRight: '5px' }}
                />
                <Select
                  id={`unit-${index}`}
                  label="Unit"
                  variant="outlined"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                  displayEmpty
                  style={{ flex: 1, marginRight: '5px' }}
                >
                  <MenuItem value="" disabled>
                    Unit
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
                  value={ingredient.ingredient}
                  onChange={(e) => handleIngredientChange(index, 'ingredient', e.target.value)}
                  style={{ flex: 1, marginRight: '5px' }}
                />
                <Button onClick={() => handleRemoveIngredient(index)} style={{ backgroundColor: '' }}>Remove</Button>
              </div>
            ))}
            <Button onClick={handleAddIngredient}>Add More</Button>

          </label> <br />
          <label style={{ display: 'block', marginBottom: '10px' }}>
            <b>Method:</b> <br /> <br />
            {recipeData.method.map((step, index) => (
              <div key={index} style={{ display: 'flex', marginBottom: '5px' }}>
                <div style={{ flex: 1, marginRight: '5px', marginTop: '15px' }}>{`Step ${step.step}`}</div>
                <TextField
                  id={`description-${index}`}
                  label=""
                  variant="outlined"
                  value={step.description}
                  onChange={(e) => handleMethodChange(index, 'description', e.target.value)}
                  style={{ flex: 2, marginRight: '5px' }} />
                <Button onClick={() => handleRemoveMethod(index)}>Remove</Button>
              </div>
            ))}
            <Button onClick={handleAddMethod}>Add More</Button>
          </label> <br />
          <Button type="submit" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</Button>

        </form>
      </div>
    </div>
  );
};

export default NewRecipeForm;