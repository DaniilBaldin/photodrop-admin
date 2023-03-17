export type photos = {
  photos: {
    name: string;
    ext: string;
    thumbnailUrl: string;
  }[];
  success: boolean;
};
export type photo = {
  name: string;
  ext: string;
  thumbnailUrl: string;
};

export type album = {
  album: {
    id: number;
    name: string;
    location: string;
    date: string;
  };
  success: boolean;
};

export type albumB = {
  albums: [
    {
      id: number;
      name: string;
      location: string;
      date: string;
      person_id: string;
      coverImageUrl: string;
    },
  ];
  success: true;
};

export type albumOne = {
  id: number;
  name: string;
  location: string;
  date: string;
  person_id: string;
  coverImageUrl: string;
};
