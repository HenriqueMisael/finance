import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import styles from '../../styles';
import PrimaryButton from '../../buttons/primary';
import i18next from 'i18next';

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

const TopRow = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: auto 8rem;
  width: 100%;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
`;

const Title = styled.header(
  styles.text,
  styles.head,
  css`
    text-align: center;
    width: 100%;
    padding-bottom: 1rem;
  `,
);

const InstructionsContainer = styled.div(
  styles.text,
  styles.body1,
  css`
    text-align: center;
    width: 100%;
    padding-bottom: 0.5rem;
  `,
);

const Footer = styled.footer`
  display: flex;
  padding-bottom: 1rem;
`;

function ProfileModal({ nameSlot, initialBalanceSlot, onConfirm, visible }) {
  return (
    <Root visible={visible} height="11rem">
      <Form>
        <Title>{i18next.t('profile.title')}</Title>
        <InstructionsContainer>{i18next.t('profile.instructions')}</InstructionsContainer>
        <TopRow>
          {nameSlot}
          {initialBalanceSlot}
        </TopRow>
      </Form>
      <Footer>
        <PrimaryButton onClick={onConfirm}>{i18next.t('done')}</PrimaryButton>
      </Footer>
    </Root>
  );
}

ProfileModal.propTypes = {
  nameSlot: PropTypes.node.isRequired,
  initialBalanceSlot: PropTypes.node.isRequired,
  onConfirm: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default ProfileModal;
