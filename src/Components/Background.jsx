import React from 'react';
import Search from './Search';
import Cards from './Cards';

const Background = () => {
  const backgroundStyle = {
    backgroundColor: 'lightyellow',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'white',
    padding: '20px',
  };

  return (
    <div style={backgroundStyle}>
      <h1 style={{color:'black', fontSize:'50px'}}>The Dessert Diaries🧁</h1>
      <Cards/>
    </div>
  );
};

export default Background;