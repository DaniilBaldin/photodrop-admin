/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import { token } from '~/store/selectors/tokenSelector';

import { InputSelect } from './components/input';

import Uppy from '@uppy/core';
import Dashboard from '@uppy/react/lib/Dashboard.js';
import XHRUpload from '@uppy/xhr-upload';
import ThumbnailGenerator from '@uppy/thumbnail-generator';

import { Modal, ModalContent } from './uppyStyles';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/drag-drop/dist/style.css';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const UppyModal: FC<Props> = (props) => {
  const { id } = useParams();
  const state = useSelector((state) => (state as RootState).tokenReducer);
  const jwtToken = token(state);

  const uppy = new Uppy({
    debug: true,
    autoProceed: false,
    restrictions: {
      maxNumberOfFiles: 10,
      maxFileSize: 10000000,
      minNumberOfFiles: 1,
      allowedFileTypes: ['.jpg', '.jpeg', '.heic'],
    },
  });

  // uppy.use(ThumbnailGenerator, {
  //   thumbnailType: 'image/jpeg',
  //   waitForThumbnailsBeforeUpload: false,
  // });

  uppy.use(XHRUpload, {
    endpoint: `${import.meta.env.VITE_BASE_URL}photographer/photo/upload`,
    formData: true,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    fieldName: 'photo',
  });

  uppy.on('file-added', (file) => {
    uppy.setFileMeta(file.id, {
      albumId: `${id}`,
    });
  });

  // uppy.on('thumbnail:generated', async (files: any, preview: string) => {
  //   const name = files.name.replace(/\.[^/.]+$/, '');
  //   const extension = files?.type.split('/').pop();

  //   const blobfile = await fetch(preview).then((r) => r.blob());

  //   const thumbnail = new File([blobfile], `${name}_thumbnail.${extension}`, {
  //     lastModified: new Date().getDate() / new Date().getTime(),
  //     type: files.type,
  //   });

  //   uppy.setFileMeta(files.id, { thumbnail });
  // });

  uppy.on('complete', (result) => {
    console.log(result);
  });

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
    <Modal onClick={props.onClose} open={props.open}>
      <ModalContent onClick={(e: { stopPropagation: () => unknown }) => e.stopPropagation()}>
        <div>
          <Dashboard
            uppy={uppy}
            plugins={['DragDrop', 'StatusBar', 'ProgressBar']}
            metaFields={[
              { id: 'name', name: 'Name', placeholder: 'File name' },
              {
                id: 'phoneNumbers',
                name: 'Enter Clients Phone Numbers',
                placeholder: 'Please, separate numbers with comma.',
              },
            ]}
            {...props}
          />
        </div>
        <InputSelect />
      </ModalContent>
    </Modal>,
    document.getElementById('root') as HTMLElement,
  );
};
