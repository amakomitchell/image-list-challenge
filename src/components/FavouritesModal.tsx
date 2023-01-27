import { FC, useEffect, useState } from 'react';
import { Photo } from '../types/photos';
import { ImageCard } from './ImageCard';
import '../styles/FavouritesModal.css';

type FavouritesProps = {
  open: () => void;
};

export const FavouritesModal: FC<FavouritesProps> = ({ open }) => {
  const [isFavouritePhotos, setIsFavouritePhotos] = useState<Photo[]>([]);

  // get favourite photos from local storage
  useEffect(() => {
    const favouritePhotos = localStorage.getItem('vinted__favouritePhotos');
    if (favouritePhotos) {
      setIsFavouritePhotos(JSON.parse(favouritePhotos));
    }
  }, []);

  const closeModal = () => {
    open();
  };

  return (
    <>
      <div className="modal-overlay" />
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <h4>My Favourite Images</h4>
            <button
              type="button"
              className="modal-close-button"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-content">
              {isFavouritePhotos.map((photo) => (
                <ImageCard key={photo.id} photo={photo} disableFavourite />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
