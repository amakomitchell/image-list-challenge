import { GetPhotosResponse } from '../types/photos';
import { APIKEY, BASE_URL, GALLERY_ID } from './constants';

export const getPhotos = async (
  page: string,
  perPage: string
): Promise<GetPhotosResponse> => {
  const response = await fetch(
    `${BASE_URL}&api_key=${APIKEY}&gallery_id=${GALLERY_ID}&per_page=${perPage}&page=${page}&format=json&nojsoncallback=1`
  );
  const data = await response.json().catch((error) => {
    throw new Error(error);
  });
  return data;
};
