import React, { useState } from 'react';
import { FavouritesModal } from './components/FavouritesModal';
import { ImageList } from './components/ImageList';
import './App.css';

export const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h2>Vinted Challenge</h2>
        <h5 onClick={toggleModal}>My Favourites</h5>
      </div>
      {isModalOpen && <FavouritesModal open={toggleModal} />}
      <div>
        <ImageList />
      </div>
    </div>
  );
};
