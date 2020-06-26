import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Body2 } from '../../../text';
import TextInput from '../../../input/text';

import { Root } from './styled-wrappers';

function TransactionMethodListItemSelected({ description, onSave, onBlur }) {
  /**
   * @type {React.MutableRefObject<HTMLInputElement>}
   */
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <Root>
      <Body2>{i18next.t('description')}</Body2>
      <TextInput
        ref={inputRef}
        placeholder={i18next.t('transactionMethodList.descriptionSample')}
        initialValue={description}
        onSubmitChange={onSave}
        onBlur={onBlur}
      />
    </Root>
  );
}

TransactionMethodListItemSelected.propTypes = {
  description: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default TransactionMethodListItemSelected;
