import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import i18next from 'i18next';

import styles from '../styles';
import PrimaryButton from '../buttons/primary';
import LinkButton from '../buttons/link';

const Root = styled.div(
  styles.modal,
  ({ visible }) => css`
    bottom: ${visible ? 0 : '-6rem'};
    right: 0;
    left: 0;
    display: flex;
    height: 6rem;
    padding-top: 1rem;
    align-items: center;
    flex-direction: column;
  `,
);

const Footer = styled.footer`
  display: flex;
  padding-top: 1rem;
`;

const Text = styled.span(styles.text, styles.body1);

function ConfirmationModal({ message, onConfirm, onDeny, visible }) {
  return (
    <Root visible={visible}>
      <Text>{message}</Text>
      <Footer>
        <PrimaryButton onClick={onConfirm}>{i18next.t('yes')}</PrimaryButton>
        <LinkButton onClick={onDeny}>{i18next.t('no')}</LinkButton>
      </Footer>
    </Root>
  );
}

ConfirmationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onDeny: PropTypes.func.isRequired,
};

export default ConfirmationModal;
