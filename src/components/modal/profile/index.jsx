import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import PrimaryButton from '../../buttons/primary';

import {
  Footer,
  Form,
  InstructionsContainer,
  Root,
  Title,
  TopRow,
} from './styled-wrappers';

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
