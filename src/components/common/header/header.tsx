import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetToken } from '~/store/actions/actions';

import { Header, LogoutButton, CreateAlbumButton, UploadPhotoButton } from './headerStyles';

import { AddAlbumModal } from '~/components/common/modal/addAlbum/addAlbumModal';
import { UppyModal } from '../modal/uppyModal/uppyModal';
import { useLocation } from 'react-router-dom';

import { albumB } from '~/api/types/album';

type Props = {
    onAlbumCreation?: (albumResponseData: albumB) => unknown;
    onDone?: (value: boolean) => void;
};

export const HeaderComponent: FC<Props> = (props) => {
    const dispatch = useDispatch();
    const path = useLocation().pathname;

    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);

    const logOutHAndler = () => {
        localStorage.setItem('tokenJWT', '');
        dispatch(resetToken());
    };

    const albumCreationFinish = (albumResponseData: albumB) => {
        props.onAlbumCreation?.(albumResponseData);
    };

    return (
        <>
            {path.includes('album') ? (
                <Header>
                    <div>
                        <UploadPhotoButton
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            Add Images
                        </UploadPhotoButton>
                        <UppyModal
                            onClose={() => {
                                setOpen(false);
                                props.onDone?.(true);
                            }}
                            open={open}
                        ></UppyModal>

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
