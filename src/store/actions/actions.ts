const ADD_TOKEN = 'ADD_TOKEN';
const RESET_TOKEN = 'RESET_TOKEN';

let id = 0;

export const addToken = (payload: string) => ({
    type: ADD_TOKEN,
    payload: payload,
    id: ++id,
});

export const resetToken = () => ({
    type: RESET_TOKEN,
});
