import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetToken } from '@/store/actions/actions';

import { Header, LogoutButton, CreateAlbumButton } from './headerStyles';

import { AddAlbumModal } from '@/components/common/modal/addAlbum/addAlbumModal';
import { useLocation } from 'react-router-dom';

type album = {
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

type AlbumProps = {
    onAlbumCreation?: (albumResponseData: album) => unknown;
};

export const HeaderComponent = (props: AlbumProps) => {
    const dispatch = useDispatch();
    const path = useLocation().pathname;

    const [show, setShow] = useState(false);

    const logOutHAndler = () => {
        localStorage.setItem('token', '');
        dispatch(resetToken());
    };

    const albumCreationFinish = (albumResponseData: album) => {
        props.onAlbumCreation?.(albumResponseData);
    };

    return (
        <>
            {path.includes('album') ? (
                <Header>
                    <div>
                        <LogoutButton onClick={logOutHAndler}>Log Out</LogoutButton>
                    </div>
                </Header>
            ) : (
                <Header>
                    <div>
                        <CreateAlbumButton
                            onClick={() => {
                                setShow(true);
                            }}
                        >
                            Add Album
                        </CreateAlbumButton>
                        <AddAlbumModal
                            onClose={() => setShow(false)}
                            show={show}
                            onCreationFinish={albumCreationFinish}
                        />
                        <LogoutButton onClick={logOutHAndler}>Log Out</LogoutButton>
                    </div>
                </Header>
            )}
        </>
    );
};
