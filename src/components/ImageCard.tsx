import { FC, useCallback, useEffect, useState } from 'react';
import { Photo } from '../types/photos';
import '../styles/ImageCard.css';

type ImageCardProps = {
  photo: Photo;
  disableFavourite?: boolean;
  isFavorite?: boolean;
  onFavouriteClick?: (photo: Photo) => void;
};

export const ImageCard: FC<ImageCardProps> = ({
  photo,
  disableFavourite,
  isFavorite,
  onFavouriteClick,
}) => {
  const [isPhotoHovered, setIsPhotoHovered] = useState<boolean>(false);

  const handleHover = useCallback(() => {
    if (disableFavourite) return;
    setIsPhotoHovered(!isPhotoHovered);
  }, [isPhotoHovered]);

  const hoverActionLabel = isFavorite ? 'Remove from favourite' : 'Favourite';

  return (
    <div className="card" onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <img
        src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
        className="image"
      />
      {isPhotoHovered && (
        <div className="hover-container">
          <h5>{photo.title}</h5>
          <hr className="hr-line" />
          <div className="photo-text">{photo.owner}</div>
          <button
            onClick={() => onFavouriteClick?.(photo)}
            className="fav-button"
          >
            {hoverActionLabel}
          </button>
        </div>
      )}
    </div>
  );
};
