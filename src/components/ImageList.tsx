import { useCallback, useEffect, useRef, useState } from 'react';
import { getPhotos } from '../repository/get-photos';
import { GetPhotosResponse, Photo } from '../types/photos';
import '../styles/ImageList.css';
import { ImageCard } from './ImageCard';

const DEFAULT_PHOTOS_DATA: GetPhotosResponse = {
  photos: {
    page: '0',
    pages: 1,
    perpage: '10',
    photo: [],
  },
};

export const ImageList = () => {
  const [photosData, setPhotosData] =
    useState<GetPhotosResponse>(DEFAULT_PHOTOS_DATA);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const loader = useRef(null);

  const getFavoritePhotosFromLocalStorage = () => {
    const favouritePhotos = localStorage.getItem('vinted__favouritePhotos');
    if (favouritePhotos) {
      return JSON.parse(favouritePhotos);
    }
    return [];
  };

  const [favouritePhotos, setFavouritePhotos] = useState<Photo[]>(
    getFavoritePhotosFromLocalStorage()
  );

  const onFavouriteClick = (photo: Photo) => {
    // check if photo is already in favourite
    const isAlreadyFavourite = favouritePhotos.some(
      (favouritePhoto) => favouritePhoto.id === photo.id
    );
    const newFavoritePhotos = isAlreadyFavourite
      ? favouritePhotos.filter(
          (favouritePhoto) => favouritePhoto.id !== photo.id
        )
      : [...favouritePhotos, photo];

    setFavouritePhotos(newFavoritePhotos);

    // add to local storage
    localStorage.setItem(
      'vinted__favouritePhotos',
      JSON.stringify(newFavoritePhotos)
    );
  };

  const showLoadingText =
    Number(photosData.photos.page) !== photosData.photos.pages;

  const loadData = useCallback(async () => {
    const newPage = parseInt(photosData.photos.page) + 1;
    const dontLoadData = newPage > (photosData.photos.pages || 0);

    if (dontLoadData) return;

    const response = await getPhotos(
      String(newPage),
      photosData.photos.perpage
    );
    // updare data state
    setPhotosData(response);
    // update photos state
    setPhotos([...photos, ...response.photos.photo]);
  }, [photosData, photos]);

  const handleObserver = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      if (entries[0].intersectionRatio <= 0) return;
      await loadData();
    },
    [loadData]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver);
    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="image-list">
        {photos.map((photo) => {
          const isFavorite = favouritePhotos.some(
            (favouritePhoto) => favouritePhoto.id === photo.id
          );
          return (
            <ImageCard
              key={photo.id}
              photo={photo}
              onFavouriteClick={onFavouriteClick}
              isFavorite={isFavorite}
            />
          );
        })}
      </div>
      {showLoadingText && (
        <div ref={loader} style={{ textAlign: 'center', marginTop: '24px' }}>
          Loading...
        </div>
      )}
    </>
  );
};
