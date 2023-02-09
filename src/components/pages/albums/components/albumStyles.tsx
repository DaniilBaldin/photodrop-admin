import styled from 'styled-components';

export const AlbumContainer = styled.div`
    width: 100%;
`;

export const AlbumMain = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px 60px 0px 100px;
`;

export const AlbumHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 80px 0px 100px;
`;

export const AlbumData = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: baseline;
    padding: 20px;
`;

export const GoBackButton = styled.button`
    border: none;
    margin: 10px;
    width: 100px;
    height: 40px;
    border-radius: 20px;
    color: white;
    background-color: navy;
    font-size: 16px;
    font-weight: 600;
    margin-left: auto;
    margin-top: 30px;
`;

export const P = styled.p`
    margin: 2px;
    font-size: 18px;
    font-weight: 600;
`;

export const PhotoCard = styled.button<{ image: string }>`
    width: 200px;
    height: 200px;
    margin: 10px;
    border-radius: 100px;
    object-fit: cover;
    border: 0.2px solid white;
    background-image: ${(props) => (props.image ? `url(${props.image})` : 'linear-gradient( #f9f7f7, navy)')};
    background-repeat: no-repeat;
    background-size: cover;
`;
