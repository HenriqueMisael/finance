import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import TextInput from '../../../components/input/text';

function EntryNameInput({ initialValue, onChange }) {

  return (
    <TextInput
      placeholder={i18next.t('title')}
      onSubmitChange={onChange}
      initialValue={initialValue}
    />
  );
}
EntryNameInput.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(EntryNameInput);
