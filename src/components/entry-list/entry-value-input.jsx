import React from 'react';
import PropTypes from 'prop-types';

import MoneyInput from '../input/money';

function EntryValueInput({ initialValue, onChange }) {
  return <MoneyInput onSubmitChange={onChange} initialValue={initialValue} />;
}
EntryValueInput.propTypes = {
  initialValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(EntryValueInput);
