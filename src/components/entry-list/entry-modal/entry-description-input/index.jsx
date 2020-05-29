import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import TextInput from '../../../input/text';

function EntryDescriptionInput({ initialValue, onChange }) {
  return (
    <TextInput
      placeholder={i18next.t('description')}
      onSubmitChange={onChange}
      initialValue={initialValue}
    />
  );
}
EntryDescriptionInput.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(EntryDescriptionInput);
