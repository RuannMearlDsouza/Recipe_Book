import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateForm from './UpdateForm';
import Select from '@mui/material/Select';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Search from './Search';
import { useRecipeContext } from './RecipeContext';

const Cards = () => {
  const [recipes, setRecipes] = useState([]);

  const [open, setOpen] = useState(false);
  const [val, setVal] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState();
  const [isEditMode, setEditMode] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [index, setIndex] = useState();

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem('recipes'))
    setRecipes(value)
  }, [])

  console.log(recipes, 90);

  const recipeContext = useRecipeContext();
  const { recipes: contextRecipes } = useRecipeContext();

  const [searchInput, setSearchInput] = useState('');



  const handleClickOpen = (recipe,index) => {
    setIndex(index)
    setSelectedRecipe(recipe)



    setEditMode(false);
    setOpen(true);
  };

  console.log(selectedRecipe, 7);


  const handleSearch = (input) => {
    setSearchInput(input);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    console.log(`Updating recipe with id ${selectedRecipe.id}`);
    setEditMode(true);
    setUpdateFormOpen(true);
  };

  const handleUpdateFormClose = () => {
    setEditMode(false)
    setUpdateFormOpen(false);
  };

  const handleDelete = () => {
    setDeleteConfirmationOpen(true);
  };

  const handleSaveChanges = (updatedRecipeData, index) => {
    console.log('Cards - Saving changes for index:', index);
    console.log('Cards - Updated Recipe Data:', updatedRecipeData);
  
    const updatedRecipes = [...recipes];
    updatedRecipes[index] = updatedRecipeData;
    setRecipes(updatedRecipes);
    setOpen(false);
    setUpdateFormOpen(false);
    setSelectedRecipe({ recipe: null, index: null });
  };
  

  const handleConfirmDelete = () => {
    console.log(`Deleting recipe with id ${selectedRecipe.id}`);
    const updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1); 
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    setOpen(false);
    setDeleteConfirmationOpen(false);
  };
  

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.categories.includes(selectedCategory))
    : recipes;

  const handleFilterButtonClick = () => {
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  const searchedRecipes = searchInput
    ? recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchInput.toLowerCase())
    )
    : recipes;

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('recipes')));
    localStorage.setItem('recipes', JSON.stringify(contextRecipes));
  }, [contextRecipes]);

  return (
    <div>
      <center>
        <Search
          onFilterButtonClick={handleFilterButtonClick}
          categories={['Donut', 'Cake', 'Cookie']}
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => setSelectedCategory(category)}
          onSearch={handleSearch}
        />
      </center>

      <center>
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-around' }}>
            {searchedRecipes?.filter((recipe) => (

              (!selectedCategory || recipe.categories.includes(selectedCategory))
            ))

              .map((item, index) => (
                <div key={index} style={{ border: '2px solid black', borderRadius: '40px', padding: '20px', margin: '20px', width: '300px', textAlign: 'center', marginBottom: '40px', backgroundColor: 'lightyellow' }}>
                  <img src={item.imageUrl} style={{ width: '200px', height: '200px', borderRadius: '30px', border: 'black 1px solid', marginBottom: '10px', marginTop: '15px' }} alt={item.title} />
                  <h2 style={{ fontSize: '24px', margin: '10px', color: 'black' }}>{item.title}</h2>
                  <p style={{ fontSize: '16px', color: 'black' }}>{item.description}</p>
                  <Button onClick={() => { handleClickOpen(item,index) }}>View Recipe</Button>
                </div>
              ))}
          </div>

        </div>
        <br /> <br /> <br /> <br /> <br />
      </center>

      <Dialog open={open} onClose={handleClose}>
        <DialogActions>
          <Button onClick={handleClose}><CloseIcon style={{ marginLeft: '20px', marginTop: '5px', color: 'black' }} /></Button>
        </DialogActions>
        <DialogTitle style={{ textAlign: 'center', marginTop: '-40px' }}><b style={{ fontSize: '35px' }}>{selectedRecipe?.title}</b></DialogTitle>
        <DialogContent>
          {isEditMode ? (
            <>
              
             <UpdateForm
  recipeData={selectedRecipe}
  onUpdate={(updatedRecipeData) => handleSaveChanges(updatedRecipeData, index)}
  onCancel={handleUpdateFormClose}
  index={index}
/>

            </>
          ) : (
            <>
              <img
                src={selectedRecipe?.imageUrl}
                alt={selectedRecipe?.title}
                style={{ width: '100%', height: '400px', borderRadius: '30px' }}
              />{' '}
              <br /> <br />
              <DialogContentText>{selectedRecipe?.briefDescription}</DialogContentText>
              <h2>Ingredients:</h2>
              <ul style={{ paddingLeft: 20 }}>
                {selectedRecipe?.ingredients &&
                  selectedRecipe?.ingredients?.map((ingredient, index) => (
                    <li key={index}>
                      {`${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient}`}
                    </li>
                  ))}
              </ul>
            
              <h2>Method:</h2>
              <ol style={{ listStyleType: 'none', padding: 0 }}>
  {selectedRecipe?.method &&
    selectedRecipe?.method.map((step, index) => (
      <li key={index}>
        <span style={{ fontWeight: 'bold' }}>{`Step ${step.step}:`}</span> {step.description}
      </li>
    ))}
</ol>


            </>
          )}
        </DialogContent>
        <DialogActions>
          {!isEditMode && (
            <>
              <Button onClick={handleUpdate}>Update</Button>
              <Button startIcon={<DeleteIcon />} onClick={handleDelete}>
                Delete
              </Button>
            </>

          )}
        </DialogActions>
      </Dialog>

      <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this recipe?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete}>Yes</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default Cards;