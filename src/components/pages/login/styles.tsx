import styled from 'styled-components';

export const MainPage = styled.section`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TextTitle = styled.h1`
    font-size: 2rem;
`;

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 500px;
    zoom: 150%;
`;

export const LoginLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    font-size: 1rem;
`;

export const Input = styled.input`
    margin: 10px;
    border-radius: 10px;
    height: 30px;
    border: 2px solid navy;
    width: 100%;
    padding: 10px;
    outline: none;

    &:focus {
        border-radius: 10px;
        border: 2px solid blue;
        outline: none;
    }
`;

export const LoginButton = styled.button`
    width: 80%;
    background-color: blue;
    border: none;
    border-radius: 10px;
    height: 30px;
    margin: 10px;
    color: aliceblue;
`;

export const InfoMessage = styled.p`
    font-size: 0.7rem;
    margin: 0;
`;
