import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { HeaderComponent } from '~/components/common/header/header';
import { RootState } from '~/store/index';
import { token } from '~/store/selectors/tokenSelector';
import { fetchHook } from '~/components/hooks/fetchHook';

import { AlbumsContainer, AlbumsMain, AlbumButton, AlbumLabel, AlbumName } from './albumsStyles';

import { albumOne, albumB } from '~/api/types/album';

export const Albums: FC = () => {
  const state = useSelector((state) => (state as RootState).tokenReducer);
  const jwtToken = token(state);
  const method = 'GET';
  const slug = 'album/all';
  const header = {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json; charset=utf-8',
  };

  const [albumData, setAlbumData] = useState<albumB | null>(null);

  const { data, error, loading, apiRequest } = fetchHook<albumB>(method, slug, undefined, header);
  console.log(data);

  const albumCreationFinish = (albumResponseData: albumB) => {
    setAlbumData(albumResponseData);
  };

  useEffect(() => {
    apiRequest();
  }, [albumData]);

  if (!data && loading) {
    return <h4>Loading...</h4>;
  }

  if (error) {
    return <h4>Error in fetching albums data.</h4>;
  }

  return (
    <AlbumsContainer>
      <HeaderComponent onAlbumCreation={albumCreationFinish} />
      <AlbumsMain>
        {data?.success
          ? data?.albums.reverse().map((e: albumOne) => (
              <AlbumLabel key={e.id}>
                <Link to={`/album/${e.id}`}>
                  <AlbumButton primary={e.coverImageUrl}>
                    <AlbumName>{e.name}</AlbumName>
                  </AlbumButton>
                </Link>
              </AlbumLabel>
            ))
          : 'No Albums'}
      </AlbumsMain>
    </AlbumsContainer>
  );
};
