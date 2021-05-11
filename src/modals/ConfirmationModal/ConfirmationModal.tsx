/* eslint-disable react/jsx-props-no-spreading */
import React, { PropsWithChildren } from 'react';
import Modal from 'react-modal';

// Components
import Button from 'components/Button';

// Styles

import {
  ModalBody, ModalTitle, ModalContent,
} from './style';

export interface ConfirmationModalProps {
  isOpen: boolean;
  modalTitle: string;
  toggle: () => void;
  onConfirm?: () => void;
}

Modal.setAppElement('#root');

const ConfirmationModal = React.memo(({
  isOpen,
  modalTitle,
  children,
  toggle,
  onConfirm,
  ...props
}: PropsWithChildren<ConfirmationModalProps>) => {
  // Handlers

  const handleOnConfirm = React.useCallback(() => {
    onConfirm?.();
    toggle();
  }, [onConfirm, toggle]);

  const customStyles = {
    content: {
      minHeight: '328px',
      maxWidth: '768px',
      margin: 'auto',
      top: '60%',
      bottom: '0px',
      right: '0px',
      left: '0px',
      backgroundColor: '#EBF1FC',
      borderRadius: '70px 70px 0px 0px',
      border: 'none',
    },
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.3)' },
  };

  return (
    <Modal
      {...props}
      isOpen={isOpen}
      onRequestClose={toggle}
      style={customStyles}
    >
      <ModalBody className="ModalBody">
        <ModalTitle>{modalTitle}</ModalTitle>
        <ModalContent>{children}</ModalContent>
        <Button onClick={handleOnConfirm} dark>
          OK
        </Button>
      </ModalBody>
    </Modal>
  );
});

export default ConfirmationModal;
