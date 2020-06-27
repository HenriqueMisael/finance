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

const TextInput = React.forwardRef(
  ({ placeholder, initialValue, disabled, onSubmitChange, onBlur, children }, ref) => {
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
        ref={ref}
        type="text"
        disabled={disabled}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onBlur={onBlur}
      >
        <ResetInput
          ref={ref}
          type="text"
          disabled={disabled}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          onBlur={onBlur}
        />
        {children}
      </Root>
    );
  },
);

TextInput.propTypes = {
  disabled: PropTypes.bool,
  initialValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onSubmitChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};

TextInput.defaultProps = {
  disabled: false,
  onBlur: null,
  children: null,
};

export default TextInput;
