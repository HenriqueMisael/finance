import React from 'react';
import PropTypes from 'prop-types';

import { Body1 } from '../../text';
import ConfirmationModal from '../confirmation';

function ConfirmationMessageModal({ height, message, onConfirm, onDeny, visible }) {
  return (
    <ConfirmationModal
      height={height}
      onConfirm={onConfirm}
      onDeny={onDeny}
      visible={visible}
    >
      <Body1>{message}</Body1>
    </ConfirmationModal>
  );
}

ConfirmationMessageModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onDeny: PropTypes.func.isRequired,
};

export default ConfirmationMessageModal;
