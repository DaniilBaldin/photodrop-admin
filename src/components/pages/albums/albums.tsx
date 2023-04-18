import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { HeaderComponent } from '~/components/common/header/header';

import { AlbumsContainer, AlbumsMain, AlbumButton, AlbumLabel, AlbumName } from './albumsStyles';

import { albumOne } from '~/api/types/album';
import { Selector } from '~/store/hooks/hooks';
import { albumsSelector } from '~/store/selectors/albumsSelector';

export const Albums: FC = () => {
  const albums = Selector(albumsSelector);

  return (
    <AlbumsContainer>
      <HeaderComponent />
      <AlbumsMain>
        {albums?.length
          ? albums
              .slice()
              .reverse()
              .map((e: albumOne, index) => (
                <AlbumLabel key={index}>
                  <Link to={`/album/${e.id}`}>
                    <AlbumButton primary={e.coverImageUrl}>
                      <AlbumName>{e.name}</AlbumName>
                      <AlbumName>{e.location}</AlbumName>
                    </AlbumButton>
                  </Link>
                </AlbumLabel>
              ))
          : 'No Albums'}
      </AlbumsMain>
    </AlbumsContainer>
  );
};
