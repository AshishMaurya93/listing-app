import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import List from './components/List';
import NotFound from './components/NotFound';


const App = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (item) => {
    if (favorites.some(favorite => favorite.id === item.id)) {
      setFavorites(favorites.filter(favorite => favorite.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard favorites={favorites} />} />
        <Route exact path="/list" element={<List addToFavorites={toggleFavorite} favorites={favorites.map(favorite => favorite.id)} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
