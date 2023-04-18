import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { tokenSelector } from '~/store/selectors/tokenSelector';
import { fetchHook } from '~/components/hooks/fetchHook';
import { HeaderComponent } from '~/components/common/header/header';

import { AlbumContainer, AlbumMain, AlbumHeader, GoBackButton, AlbumData, P, Photos } from './albumStyles';

import { album, photos, photo } from '~/api/types/album';
import { Selector } from '~/store/hooks/hooks';

export const Album: FC = () => {
  const jwtToken = Selector(tokenSelector);

  const method = 'GET';
  const { id } = useParams();
  const photosSlug = `photographer/photo/all/${id}`;
  const albumSlug = `photographer/album/${id}`;
  const header = { Authorization: `Bearer ${jwtToken}` };
  const navigate = useNavigate();
  const [finish, setFinish] = useState<boolean>(false);

  const { data, apiRequest } = fetchHook<photos>(method, photosSlug, undefined, header);

  const albumData = fetchHook<album>(method, albumSlug, undefined, header);

  const date = albumData.data?.album.date;
  const formattedDate = (date: string) => {
    if (!date) {
      return '';
    }
    return new Date(date).toLocaleDateString('en-GB');
  };

  const uploadFinish = (value: boolean) => {
    apiRequest();
    setFinish(value);
  };

  useEffect(() => {
    setFinish(false);
  }, [finish]);

  const goBackHandler = () => {
    navigate(-1);
  };

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
          <P>Photos:</P>
          <Photos>
            {data?.photos.length ? (
              data?.photos.map((e: photo, index) => <P key={index}>- {e.name}</P>)
            ) : (
              <P>No Photos</P>
            )}
          </Photos>
        </>
      </AlbumMain>
    </AlbumContainer>
  );
};
