import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import PrimaryButton from '../../buttons/primary';
import LinkButton from '../../buttons/link';

import { Footer, Root } from './styled-wrappers';

function ConfirmationModal({ children, onConfirm, onDeny, visible, height }) {
  return (
    <Root visible={visible} height={height}>
      {children}
      <Footer>
        <PrimaryButton onClick={onConfirm}>{i18next.t('yes')}</PrimaryButton>
        <LinkButton onClick={onDeny}>{i18next.t('no')}</LinkButton>
      </Footer>
    </Root>
  );
}

ConfirmationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  height: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onDeny: PropTypes.func.isRequired,
};

export default ConfirmationModal;
