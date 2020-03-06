import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import styles from '../styles';

const Root = styled.input(
  styles.text,
  styles.body1,
  styles.input,
  css`
    width: 100%;
  `,
);

function TextInput({ initialValue = '', disabled }) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    ({ target }) => {
      setValue(target.value);
    },
    [setValue],
  );

  return <Root type="text" disabled={disabled} value={value} onChange={handleChange} />;
}

TextInput.propTypes = {
  initialValue: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default TextInput;
