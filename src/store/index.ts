import { legacy_createStore as createStore, combineReducers } from 'redux';

import { tokenReducer } from './reducers/reducers';

const rootReducer = combineReducers({
    tokenReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
