import React from 'react'
import { useRecipeContext } from './RecipeContext'
import Background from './Background'

const Main = () => {
    const { recipes } = useRecipeContext();
    return (
      <Background/>
    );
  };
  export default Main;