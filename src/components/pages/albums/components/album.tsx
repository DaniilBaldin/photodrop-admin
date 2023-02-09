import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { RootState } from '@/store';
import { token } from '@/store/selectors/tokenSelector';

import { fetchHook } from '@/components/hooks/fetchHook';

import { HeaderComponent } from '@/components/common/header/header';
import { AlbumContainer, AlbumMain, AlbumHeader, GoBackButton, AlbumData, P, PhotoCard } from './albumStyles';

import { OpenPhotoModal } from '@/components/common/modal/openPhoto/openPhotoModal';

type photos = {
    data: {
        id: number;
        photo_logo: string;
        client_name: string;
        photo_url: string;
        album_id: string;
        marked_url: string;
        marked_logo: string;
    }[];
    success: boolean;
};
type photo = {
    id: number;
    photo_logo: string;
    client_name: string;
    photo_url: string;
    album_id: string;
    marked_url: string;
    marked_logo: string;
};

type album = {
    data: {
        id: number;
        album_name: string;
        album_location: string;
        person_id: string;
        album_logo: string | null;
        date: string;
    }[];
    success: boolean;
};

export const Album: FC = () => {
    const state = useSelector((state) => (state as RootState).tokenReducer);
    const jwtToken = token(state);
    const method = 'GET';
    const { id } = useParams();
    const photosSlug = `photos/${id}`;
    const albumSlug = `album/${id}`;
    const header = { Authorization: `Bearer ${jwtToken}` };
    const navigate = useNavigate();

    const [show, setShow] = useState<boolean>(false);
    const [image, setImage] = useState<string>('');

    const { data, error, loading } = fetchHook<photos>(method, photosSlug, undefined, header);
    const albumData = fetchHook<album>(method, albumSlug, undefined, header);

    const date = albumData.data?.data[0].date;
    const formattedDate = (date: string) => {
        if (!date) {
            return '';
        }
        return new Date(date).toLocaleDateString('en-GB');
    };

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
            <HeaderComponent />
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
                                <PhotoCard
                                    image={e.photo_logo}
                                    onClick={() => {
                                        setShow(true);
                                        setImage(e.photo_url);
                                    }}
                                ></PhotoCard>
                            </div>
                        ))
                    ) : (
                        <P>{'No Photos'}</P>
                    )}
                </>
                <OpenPhotoModal
                    onClose={() => setShow(false)}
                    show={show}
                    imageSrc={image}
                ></OpenPhotoModal>
            </AlbumMain>
        </AlbumContainer>
    );
};
