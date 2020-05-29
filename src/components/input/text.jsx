import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import useDebounce from '../../hooks/use-debounce';
import styles from '../styles';

const Root = styled.input(
  styles.body1,
  styles.input,
  css`
    width: 100%;
  `,
);

function TextInput({ placeholder, initialValue, disabled, onSubmitChange }) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    ({ target }) => {
      setValue(target.value);
    },
    [setValue],
  );

  useDebounce(value, setValue, initialValue, onSubmitChange);

  return (
    <Root
      type="text"
      disabled={disabled}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}

TextInput.propTypes = {
  disabled: PropTypes.bool,
  initialValue: PropTypes.string.isRequired,
  onSubmitChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
  disabled: false,
};

export default TextInput;
