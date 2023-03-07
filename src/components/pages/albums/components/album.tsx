import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { RootState } from '~/store';
import { token } from '~/store/selectors/tokenSelector';
import { fetchHook } from '~/components/hooks/fetchHook';
import { HeaderComponent } from '~/components/common/header/header';

import { AlbumContainer, AlbumMain, AlbumHeader, GoBackButton, AlbumData, P, PhotoCard } from './albumStyles';

import { album, photos, photo } from '~/api/types/album';

export const Album: FC = () => {
  const state = useSelector((state) => (state as RootState).tokenReducer);
  const jwtToken = token(state);
  const method = 'GET';
  const { id } = useParams();
  const photosSlug = `photos/${id}`;
  const albumSlug = `album/${id}`;
  const header = { Authorization: `Bearer ${jwtToken}` };
  const navigate = useNavigate();
  const [finish, setFinish] = useState<boolean>(false);

  const { data, error, loading, apiRequest } = fetchHook<photos>(method, photosSlug, undefined, header);
  const albumData = fetchHook<album>(method, albumSlug, undefined, header);

  const date = albumData.data?.data[0].date;
  const formattedDate = (date: string) => {
    if (!date) {
      return '';
    }
    return new Date(date).toLocaleDateString('en-GB');
  };

  const uploadFinish = (value: boolean) => {
    setFinish(value);
  };

  useEffect(() => {
    apiRequest();
    setFinish(false);
  }, [finish]);

  const goBackHandler = () => {
    navigate(-1);
  };

  if (!data && loading) {
    return <h4>Loading...</h4>;
  }

  if (error) {
    return <h4>Error:fetching albums photos not successfull.</h4>;
  }

  return (
    <AlbumContainer>
      <HeaderComponent onDone={uploadFinish} />
      <AlbumHeader>
        <AlbumData>
          <P>Album Name: {albumData.data?.data[0].album_name}</P>
          <P>Album Location: {albumData.data?.data[0].album_location}</P>
          <P>Album Date: {formattedDate(date as string)} </P>
        </AlbumData>
        <GoBackButton onClick={goBackHandler}>Go Back</GoBackButton>
      </AlbumHeader>
      <AlbumMain>
        <>
          {data?.success ? (
            data?.data.map((e: photo) => (
              <div key={e.id}>
                <PhotoCard src={e.photo_logo} loading="lazy" />
              </div>
            ))
          ) : (
            <P>{'No Photos'}</P>
          )}
        </>
      </AlbumMain>
    </AlbumContainer>
  );
};
