import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import useDebounce from '../../hooks/use-debounce';
import styles from '../styles';

const Root = styled.input(
  styles.text,
  styles.body1,
  styles.input,
  css`
    width: 100%;
  `,
);

let timeoutID;

function TextInput({ initialValue, disabled, onSubmitChange }) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    ({ target }) => {
      setValue(target.value);
    },
    [setValue],
  );

  timeoutID = useDebounce(timeoutID, value, initialValue, onSubmitChange);

  return <Root type="text" disabled={disabled} value={value} onChange={handleChange} />;
}

TextInput.propTypes = {
  disabled: PropTypes.bool,
  initialValue: PropTypes.string.isRequired,
  onSubmitChange: PropTypes.func.isRequired,
};

export default TextInput;
