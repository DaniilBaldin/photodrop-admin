import { configureStore } from '@reduxjs/toolkit';

import tokenReducer from './reducers/tokenReducer';
import albumsReducer from './reducers/albumsReducer';

export const store = configureStore({
  reducer: {
    tokens: tokenReducer,
    albums: albumsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
