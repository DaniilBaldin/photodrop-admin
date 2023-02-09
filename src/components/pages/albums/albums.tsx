import React, { FC, useEffect, useState } from 'react';

import { HeaderComponent } from '@/components/common/header/header';

import { useSelector } from 'react-redux';

import { RootState } from '@/store/index';
import { token } from '@/store/selectors/tokenSelector';

import { fetchHook } from '@/components/hooks/fetchHook';

import { albumsResponse } from '@/api/types/albums';

import { AlbumsContainer, AlbumsMain, AlbumButton, AlbumLabel } from './albumsStyles';
import { Link } from 'react-router-dom';

type album = {
    id: number;
    album_name: string;
    album_location: string;
    date: string;
    person_id: string;
    album_logo: string;
};

type albumData = {
    data: [
        {
            id: number;
            album_name: string;
            album_location: string;
            date: string;
            person_id: string;
            album_logo: string;
        }
    ];
    success: true;
};

export const Albums: FC = () => {
    const state = useSelector((state) => (state as RootState).tokenReducer);
    const jwtToken = token(state);
    const method = 'GET';
    const slug = 'albums';
    const header = { Authorization: `Bearer ${jwtToken}` };

    const [albumData, setAlbumData] = useState<albumData | null>(null);

    const { data, error, loading, apiRequest } = fetchHook<albumsResponse>(method, slug, undefined, header);

    const albumCreationFinish = (albumResponseData: albumData) => {
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
                    ? data?.data.reverse().map((e: album) => (
                          <AlbumLabel key={e.id}>
                              <Link to={`/album/${e.id}`}>
                                  <AlbumButton primary={e.album_logo}></AlbumButton>
                              </Link>
                              {e.album_name}
                          </AlbumLabel>
                      ))
                    : 'No Albums'}
            </AlbumsMain>
        </AlbumsContainer>
    );
};
