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
  const photosSlug = `photographer/photo/all/${id}`;
  const albumSlug = `photographer/album/${id}`;
  const header = { Authorization: `Bearer ${jwtToken}` };
  const navigate = useNavigate();
  const [finish, setFinish] = useState<boolean>(false);

  const { data, error, loading, apiRequest } = fetchHook<photos>(method, photosSlug, undefined, header);
  console.log(data);
  const albumData = fetchHook<album>(method, albumSlug, undefined, header);

  const date = albumData.data?.album.date;
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
          <P>Album Name: {albumData.data?.album.name}</P>
          <P>Album Location: {albumData.data?.album.location}</P>
          <P>Album Date: {formattedDate(date as string)} </P>
        </AlbumData>
        <GoBackButton onClick={goBackHandler}>Go Back</GoBackButton>
      </AlbumHeader>
      <AlbumMain>
        <>
          {data?.success ? (
            data?.photos.map((e: photo, index) => (
              <div key={index}>
                <PhotoCard src={e.thumbnailUrl} loading="lazy" />
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
