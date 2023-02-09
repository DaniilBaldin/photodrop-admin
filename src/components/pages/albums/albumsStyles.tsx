import styled from 'styled-components';

export const AlbumsContainer = styled.div`
    width: 100%;
`;

export const AlbumsMain = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    flex-wrap: wrap;
    width: 100%;
    padding: 20px 20px 20px 100px;
`;

export const AlbumButton = styled.button<{ primary: string }>`
    margin: 10px;
    height: 200px;
    width: 200px;
    background-color: transparent;
    border-radius: 150px;
    border: 0.2px solid white;
    background-image: ${(props) => (props.primary ? `url(${props.primary})` : 'linear-gradient( #f9f7f7, navy)')};
    background-repeat: no-repeat;
    background-size: cover;
`;

export const AlbumLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 500;
    color: navy;
`;
