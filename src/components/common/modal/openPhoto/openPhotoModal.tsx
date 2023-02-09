import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Modal, ModalContent, Image } from './openPhotoStyles';

export const OpenPhotoModal = (props: { show: boolean; onClose: () => void; imageSrc: string }) => {
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
        <Modal
            show={props.show}
            onClick={props.onClose}
        >
            <ModalContent>
                <Image
                    // width={900}
                    // height={900}
                    src={`${props.imageSrc}`}
                    loading='lazy'
                />
            </ModalContent>
        </Modal>,
        document.getElementById('root') as HTMLElement
    );
};
