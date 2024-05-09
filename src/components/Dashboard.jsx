import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ favorites }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/list">Go to List</Link>
      <h2>Favorites</h2>
      <ul>
        {favorites && favorites.length > 0 ?
          <table className="item-table"> {/* Add a class for styling */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Thumbnail</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td><img src={item.thumbnailUrl} alt='' /></td>
                </tr>
              ))}
            </tbody>
          </table>
          :
          ""}
      </ul>
    </div>
  );
};

export default Dashboard;
