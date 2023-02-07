const ADD_TOKEN = 'ADD_TOKEN';
const RESET_TOKEN = 'RESET_TOKEN';

type Initial = {
    token: string;
};

const initialToken = localStorage.getItem('token');

const initialState: Initial = {
    token: initialToken || '',
};

export const tokenReducer = (state = initialState, action: { type: string; payload: string }) => {
    if (action.type === ADD_TOKEN) {
        return {
            token: action.payload,
        };
    } else if (action.type === RESET_TOKEN) {
        return {
            token: '',
        };
    } else {
        return state;
    }
};
