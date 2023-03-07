import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/index';
import { token } from '~/store/selectors/tokenSelector';

import {
  Modal,
  ModalContent,
  Button,
  Footer,
  ModalForm,
  ModalLabel,
  ModalInput,
  ModalInputDate,
  InfoMessage,
} from './addAlbumStyles';

import { albumB } from '~/api/types/album';

type Props = {
  show: boolean;
  onClose: () => void;
  onCreationFinish: (albumResponseData: albumB) => void;
};

export const AddAlbumModal: FC<Props> = (props) => {
  const [album, setAlbum] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [error, setError] = useState<string>('');

  const state = useSelector((state) => (state as RootState).tokenReducer);
  const jwtToken = token(state);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const albumData = {
    album_name: album,
    album_location: location,
    date: date,
  };

  const albumChangeHandler = (event: { target: { value: React.SetStateAction<string> } }) => {
    setAlbum(event.target.value);
  };
  const locationChangeHandler = (event: { target: { value: React.SetStateAction<string> } }) => {
    setLocation(event.target.value);
  };
  const dateChangeHandler = (event: { target: { value: React.SetStateAction<string> } }) => {
    setDate(event.target.value);
  };

  const formSubmitHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      if (!album || !location || !date) {
        setError('Please, fill out all fields.');
      } else {
        const response = await fetch(`${baseUrl}album`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(albumData),
        });

        const data: albumB = await response.json();
        if (data) {
          props.onCreationFinish(data);
        }

        setError('');
        props.onClose();
        setAlbum('');
        setLocation('');
        setDate('');
      }
    } catch (err) {
      setError('Error: sending data was not successfull!');
    }
  };

  const closeOnEscapeKeyDown = (e: { charCode: number; keyCode: number }) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanUp() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  return createPortal(
    <Modal onClick={props.onClose} show={props.show}>
      <ModalContent onClick={(e) => e.stopPropagation()} onSubmit={formSubmitHandler}>
        <ModalForm>
          <ModalLabel>
            Album Name
            <ModalInput
              type="text"
              autoComplete="off"
              minLength={4}
              maxLength={20}
              value={album}
              required
              onChange={albumChangeHandler}
            ></ModalInput>
          </ModalLabel>
          <ModalLabel>
            Album Location
            <ModalInput
              type="text"
              autoComplete="off"
              minLength={4}
              maxLength={20}
              value={location}
              required
              onChange={locationChangeHandler}
            ></ModalInput>
          </ModalLabel>
          <ModalLabel>
            Album Date
            <ModalInputDate type="date" value={date} required onChange={dateChangeHandler}></ModalInputDate>
          </ModalLabel>
          {error ? (
            <>
              <InfoMessage>{error}</InfoMessage>
            </>
          ) : (
            ''
          )}
        </ModalForm>
        <Footer>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button type="submit" onClick={formSubmitHandler}>
            Add album
          </Button>
        </Footer>
      </ModalContent>
    </Modal>,
    document.getElementById('root') as HTMLElement,
  );
};
