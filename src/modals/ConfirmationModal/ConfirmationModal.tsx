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

  return (
    <Modal
      {...props}
      isOpen={isOpen}
      onRequestClose={toggle}
    >
      <ModalBody className="ModalBody">
        <ModalTitle>{modalTitle}</ModalTitle>
        <ModalContent>{children}</ModalContent>
        <Button onClick={handleOnConfirm}>
          OK
        </Button>
      </ModalBody>
    </Modal>
  );
});

export default ConfirmationModal;
