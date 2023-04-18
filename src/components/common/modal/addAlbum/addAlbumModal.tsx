import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { tokenSelector } from '~/store/selectors/tokenSelector';

import {
  Modal,
  ModalContent,
  Button,
  Footer,
  ModalForm,
  ModalLabel,
  ModalInput,
  ModalInputDate,
} from './addAlbumStyles';

import { albumB } from '~/api/types/album';
import { Dispatch, Selector } from '~/store/hooks/hooks';
import { albumsSelector } from '~/store/selectors/albumsSelector';
import { addOneAlbum } from '~/store/reducers/albumsReducer';

type Props = {
  show: boolean;
  onClose: () => void;
};

export const AddAlbumModal: FC<Props> = (props) => {
  const dispatch = Dispatch();

  const [album, setAlbum] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const jwtToken = Selector(tokenSelector);
  const albums = Selector(albumsSelector);

  const albumId = albums?.slice().reverse()[0];

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const albumData = {
    name: album,
    location: location,
    date: date,
  };
  const albumSingle = {
    id: (albumId?.id as number) + 1,
    name: album,
    location: location,
    date: date,
    person_id: '',
    coverImageUrl: '',
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
        alert('Please, fill out all fields.');
      } else {
        const response = await fetch(`${baseUrl}photographer/album/upload`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
            'ngrok-skip-browser-warning': '69420',
          },
          body: JSON.stringify(albumData),
        });

        const data: albumB = await response.json();
        if (data) {
          dispatch(addOneAlbum(albumSingle));
        }

        props.onClose();
        setAlbum('');
        setLocation('');
        setDate('');
      }
    } catch (err) {
      alert('Error: sending data was not successfull!');
    }
  };

  const closeHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setAlbum('');
    setLocation('');
    setDate('');
    props.onClose();
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
    <div>
      <Modal onClick={closeHandler} show={props.show} />
      <ModalContent show={props.show} onClick={(e) => e.stopPropagation()} onSubmit={formSubmitHandler}>
        <ModalForm>
          <ModalLabel>
            Album Name
            <ModalInput
              type="text"
              autoComplete="off"
              minLength={1}
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
              minLength={1}
              value={location}
              required
              onChange={locationChangeHandler}
            ></ModalInput>
          </ModalLabel>
          <ModalLabel>
            Album Date
            <ModalInputDate
              onClick={(event) => {
                event.currentTarget.showPicker();
              }}
              onFocus={(event) => {
                event.currentTarget.showPicker();
              }}
              type="date"
              value={date}
              required
              onChange={dateChangeHandler}
              max={new Date().toISOString().split('T')[0]}
              data-date-inline-picker="false"
              data-date-open-on-focus="true"
            ></ModalInputDate>
          </ModalLabel>
        </ModalForm>
        <Footer>
          <Button onClick={closeHandler}>Cancel</Button>
          <Button type="submit" onClick={formSubmitHandler}>
            Add album
          </Button>
        </Footer>
      </ModalContent>
    </div>,
    document.getElementById('root') as HTMLElement,
  );
};
