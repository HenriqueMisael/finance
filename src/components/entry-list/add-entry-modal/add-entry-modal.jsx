import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import i18next from 'i18next';

import ConfirmationModal from '../../modal/confirmation';
import styles from '../../styles';

const TopRow = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: auto 8rem;
  padding-bottom: 0.5rem;
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

function AddEntryModal({
  handleConfirm,
  handleDeny,
  nameSlot,
  descriptionSlot,
  valueSlot,
  visible,
}) {
  return (
    <ConfirmationModal
      onConfirm={handleConfirm}
      onDeny={handleDeny}
      visible={visible}
      height="13rem"
    >
      <Form>
        <Title>{i18next.t('entryList.addingNewEntry')}</Title>
        <TopRow>
          {nameSlot}
          {valueSlot}
        </TopRow>
        {descriptionSlot}
      </Form>
    </ConfirmationModal>
  );
}

AddEntryModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  nameSlot: PropTypes.node.isRequired,
  descriptionSlot: PropTypes.node.isRequired,
  valueSlot: PropTypes.node.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleDeny: PropTypes.func.isRequired,
};

export default React.memo(AddEntryModal);
