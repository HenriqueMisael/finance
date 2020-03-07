import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import styles from '../styles';

import ConfirmationModal from './confirmation';

const Text = styled.span(styles.text, styles.body1);

function ConfirmationMessageModal({ message, onConfirm, onDeny, visible }) {
  return (
    <ConfirmationModal onConfirm={onConfirm} onDeny={onDeny} visible={visible}>
      <Text>{message}</Text>
    </ConfirmationModal>
  );
}

ConfirmationMessageModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onDeny: PropTypes.func.isRequired,
};

export default ConfirmationMessageModal;
