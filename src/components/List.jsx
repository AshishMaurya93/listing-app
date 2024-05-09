import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './listStyle.css';

const List = ({ addToFavorites, favorites }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`
        );
        const data = await response.json();

        setItems(prevItems => {
          if (page === 1) {
            return data;
          } else {
            return [...prevItems, ...data];
          }
        });

        setLoading(false);
      } catch (error) {
        console.error('Error loading List data:', error);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (loading) return;
    if (observer.current) observer.current.observe(document.querySelector('.loading-ref'));
  }, [loading]);

  const handleAddToFavorites = item => {
    addToFavorites(item);
  };

  return (
    <div>
      <Link to="/">Back to Dashboard</Link>
      <h1>List Page</h1>
      <table className="item-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Thumbnail</th>
            <th>Favorite</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td><img src={item.thumbnailUrl} alt='' /></td>
              <td>
                <button onClick={() => handleAddToFavorites(item)}>
                  {favorites.includes(item.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="loading-ref" style={{ height: '10px', visibility: loading ? 'visible' : 'hidden' }}></div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default List;
