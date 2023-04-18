import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Header, LogoutButton, CreateAlbumButton, UploadPhotoButton } from './headerStyles';

import { AddAlbumModal } from '~/components/common/modal/addAlbum/addAlbumModal';
import { UppyModal } from '../modal/uppyModal/uppyModal';
import { useLocation } from 'react-router-dom';

import { removeToken } from '~/store/reducers/tokenReducer';

type Props = {
  onDone?: (value: boolean) => void;
};

export const HeaderComponent: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const path = useLocation().pathname;

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const logOutHAndler = () => {
    localStorage.removeItem('tokenJWT');
    dispatch(removeToken());
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
            <AddAlbumModal onClose={() => setShow(false)} show={show} />
            <LogoutButton onClick={logOutHAndler}>Log Out</LogoutButton>
          </div>
        </Header>
      )}
    </>
  );
};
