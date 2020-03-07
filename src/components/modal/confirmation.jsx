import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import i18next from 'i18next';

import styles from '../styles';
import PrimaryButton from '../buttons/primary';
import LinkButton from '../buttons/link';

const Root = styled.div(
  styles.modal,
  ({ visible, height }) => css`
    bottom: ${visible ? 0 : `-${height}`};
    right: 0;
    left: 0;
    display: flex;
    height: ${height};
    padding-top: 1rem;
    align-items: center;
    flex-direction: column;
  `,
);

const Footer = styled.footer`
  display: flex;
  padding: 1rem 0;
`;

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
