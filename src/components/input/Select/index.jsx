import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Option, Root } from './styled-wrappers';

function Select({ options, onSelect, selected }) {
  const handleChange = useCallback(
    ({ target }) => {
      onSelect(target.value);
    },
    [onSelect],
  );

  return (
    <Root name="Select" onChange={handleChange} value={selected}>
      {options.map(({ label, id }) => (
        <Option key={id} value={id}>
          {label}
        </Option>
      ))}
    </Root>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) }),
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Select;
