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
  width: 100%;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 0 0.5rem;

  display: grid;
  grid-template-rows: auto auto auto;
  grid-gap: 0.5rem;
`;

const Title = styled.header(
  styles.head,
  css`
    text-align: center;
    width: 100%;
    padding-bottom: 1rem;
  `,
);

function EntryModal({
  handleConfirm,
  handleDeny,
  nameSlot,
  descriptionSlot,
  transactionMethodSlot,
  valueSlot,
  visible,
}) {
  return (
    <ConfirmationModal
      onConfirm={handleConfirm}
      onDeny={handleDeny}
      visible={visible}
      height="15rem"
    >
      <Title>{i18next.t('entryList.addingNewEntry')}</Title>
      <Form>
        <TopRow>
          {nameSlot}
          {valueSlot}
        </TopRow>
        {descriptionSlot}
        {transactionMethodSlot}
      </Form>
    </ConfirmationModal>
  );
}

EntryModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  nameSlot: PropTypes.node.isRequired,
  descriptionSlot: PropTypes.node.isRequired,
  valueSlot: PropTypes.node.isRequired,
  transactionMethodSlot: PropTypes.node.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleDeny: PropTypes.func.isRequired,
};

export default React.memo(EntryModal);
