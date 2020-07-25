import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { MdBlock, MdCheck } from 'react-icons/md';

import { Body2 } from '../../../text';
import TextInput from '../../../input/text';
import IconButton from '../../../buttons/icon';

import { Root } from './styled-wrappers';

function TransactionMethodListItemSelected({ onSave, onCancel, description, onChange }) {
  useEffect(() => {
    document.getElementById('transaction-method-description-input').focus();
  }, []);

  return (
    <Root>
      <Body2>{i18next.t('description')}</Body2>
      <TextInput
        id="transaction-method-description-input"
        placeholder={i18next.t('transactionMethodList.descriptionSample')}
        initialValue={description}
        onSubmitChange={onChange}
        onPressEnter={onSave}
        onPressEscape={onCancel}
      >
        <IconButton onClick={onSave} ariaLabel="Save transaction method" noPadding>
          <MdCheck />
        </IconButton>
        <IconButton ariaLabel="Cancel transaction method" onClick={onCancel} noPadding>
          <MdBlock />
        </IconButton>
      </TextInput>
    </Root>
  );
}

TransactionMethodListItemSelected.propTypes = {
  description: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default TransactionMethodListItemSelected;
