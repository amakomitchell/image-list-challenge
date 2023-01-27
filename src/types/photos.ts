export type Photo = {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  isPublic: number;
  isFriend: number;
  isFamily: number;
  is_primary: string;
  has_comment: string;
};

export type GetPhotosResponse = {
  photos: {
    page: string;
    pages?: number;
    perpage: string;
    total?: number;
    photo: Photo[];
  };
  stat?: string;
};
