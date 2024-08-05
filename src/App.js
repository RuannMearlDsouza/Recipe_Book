import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './Components/RecipeContext'; 

import Main from './Components/Main';
import NewRecipeForm from './Components/NewRecipeForm';
import Cards from './Components/Cards';

const App = () => {
  return (
    <Router>
      <RecipeProvider>
        
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/new-recipe" element={<NewRecipeForm />} />
          <Route path="/cards" element={<Cards />} />
        </Routes>
      </RecipeProvider>
    </Router>
  );
};

export default App;