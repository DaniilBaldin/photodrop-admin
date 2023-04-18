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
  border-radius: 10px;
  border: 0.2px solid transparent;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.7) 0 100%), url(${'/album.svg'});
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

export const AlbumName = styled.p`
  margin-top: 5px;
  /* margin-bottom: 3px; */
  color: navy;
  font-size: 14px;
  font-weight: 600;
  z-index: 999;
`;
