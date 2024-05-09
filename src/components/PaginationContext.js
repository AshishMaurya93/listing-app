import React, { createContext, useState, useEffect } from 'react';

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [page1, setPage1] = useState(1);
  const [items1, setItems1] = useState([]);

  useEffect(() => {
    // Load items from local storage if available
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems1(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    // Save items to local storage whenever items change
    localStorage.setItem('items', JSON.stringify(items1));
  }, [items1]);

  return (
    <PaginationContext.Provider value={{ page1, setPage1, items1, setItems1 }}>
      {children}
    </PaginationContext.Provider>
  );
};
