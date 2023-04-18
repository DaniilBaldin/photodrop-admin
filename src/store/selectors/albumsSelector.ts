import { RootState } from '..';
import { createSelector } from '@reduxjs/toolkit';

export const albumsSelector = createSelector(
  (state: RootState) => state.albums.albums,
  (items) => items,
);
