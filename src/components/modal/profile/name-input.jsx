import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import TextInput from '../../input/text';

function ProfileNameInput({ initialValue, onChange }) {
  return (
    <TextInput
      placeholder={i18next.t('name')}
      onSubmitChange={onChange}
      initialValue={initialValue}
    />
  );
}
ProfileNameInput.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(ProfileNameInput);
