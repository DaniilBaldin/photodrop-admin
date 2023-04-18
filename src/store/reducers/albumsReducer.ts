import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Album = {
  id: number;
  name: string;
  location: string;
  date: string;
  person_id: string;
  coverImageUrl: string;
}[];

type Albums = {
  albums: Album | null;
};

const initialState: Albums = {
  albums: [] || null,
};

export const albumsReducer = createSlice({
  name: 'albums',
  initialState: initialState,
  reducers: {
    addAlbum(state: Albums, action: PayloadAction<Album>) {
      state.albums = action.payload;
    },
    addOneAlbum(
      state: Albums,
      action: PayloadAction<{
        id: number;
        name: string;
        location: string;
        date: string;
        person_id: string;
        coverImageUrl: string;
      }>,
    ) {
      state.albums?.push(action.payload);
    },
  },
});

export const { addAlbum, addOneAlbum } = albumsReducer.actions;

export default albumsReducer.reducer;
