import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import useDebounce from '../../hooks/use-debounce';
import styles from '../styles';
import ResetInput from './reset';

const Root = styled.div(
  styles.body1,
  styles.input,
  css`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `,
);

const ButtonsContainer = styled.div(
  css`
    display: flex;
    align-items: center;
  `,
);

const TextInput = ({
  id,
  placeholder,
  initialValue,
  disabled,
  onPressEnter,
  onPressEscape,
  onSubmitChange,
  onBlur,
  children,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    ({ target }) => {
      setValue(target.value);
    },
    [setValue],
  );

  const handleKeyDown = useCallback(
    ({ key }) => {
      if (onPressEnter && key === 'Enter') {
        onPressEnter();
      }
      if (onPressEscape && key === 'Escape') {
        onPressEscape();
      }
    },
    [onPressEnter, onPressEscape],
  );

  useDebounce(value, setValue, initialValue, onSubmitChange);

  return (
    <Root
      type="text"
      disabled={disabled}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      onBlur={onBlur}
    >
      <ResetInput
        id={id}
        type="text"
        disabled={disabled}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
      />
      <ButtonsContainer>{children}</ButtonsContainer>
    </Root>
  );
};

TextInput.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  initialValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onSubmitChange: PropTypes.func.isRequired,
  onPressEnter: PropTypes.func,
  onPressEscape: PropTypes.func,
  children: PropTypes.node,
};

TextInput.defaultProps = {
  id: null,
  disabled: false,
  onBlur: null,
  onPressEnter: null,
  onPressEscape: null,
  children: null,
};

export default TextInput;
