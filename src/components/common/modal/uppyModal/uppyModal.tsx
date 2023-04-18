import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';

import { tokenSelector } from '~/store/selectors/tokenSelector';

import { InputSelect } from './components/input';

import Uppy from '@uppy/core';
import Dashboard from '@uppy/react/lib/Dashboard.js';
import XHRUpload from '@uppy/xhr-upload';

import { Modal, ModalContent } from './uppyStyles';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import { Selector } from '~/store/hooks/hooks';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const UppyModal: FC<Props> = (props) => {
  const { id } = useParams();
  const jwtToken = Selector(tokenSelector);

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
    <div>
      <Modal onClick={props.onClose} open={props.open} />
      <ModalContent open={props.open} onClick={(e: { stopPropagation: () => unknown }) => e.stopPropagation()}>
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
    </div>,
    document.getElementById('root') as HTMLElement,
  );
};
