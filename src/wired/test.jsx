import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import modal from '../store/modal';
import ConfirmationModal from '../components/modal/confirmation';

const { modalOpen, modalClose } = modal.creators;

function TestModal({ message, visible }) {
  const dispatch = useDispatch();

  const handleConfirm = useCallback(() => {
    setTimeout(() => dispatch(modalOpen('TestModal', { message })), 3000);
    dispatch(modalClose('TestModal'));
  }, [dispatch, message]);

  const handleDeny = useCallback(() => dispatch(modalClose('TestModal')), [dispatch]);

  return (
    <ConfirmationModal
      onConfirm={handleConfirm}
      onDeny={handleDeny}
      message={message}
      visible={visible}
    />
  );
}

TestModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default TestModal;
