import React, { createContext, useContext, useState, useEffect } from 'react';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const [recipes, setRecipes] = useState(storedRecipes);

    useEffect(() => {
        console.log('Stored Recipes from Local Storage:', storedRecipes);
        console.log('Recipes in State:', recipes);
        localStorage.setItem('recipes', JSON.stringify(recipes));
      }, [recipes]);
    
    const addRecipe = (newRecipe) => {
      setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    };

    const updateRecipe = (updatedRecipe) => {
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe))
        );
      };

  return (
    <RecipeContext.Provider value={{ recipes: recipes || [], addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipeContext must be used within a RecipeProvider');
  }
  return context;
};