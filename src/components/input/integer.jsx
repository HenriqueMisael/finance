import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { MdRemove, MdAdd } from 'react-icons/md';

import useDebounce from '../../hooks/use-debounce';
import styles from '../styles';
import IconButton from '../buttons/icon';

import ResetInput from './reset';

const Root = styled.div(
  styles.input,
  css`
    position: relative;
  `,
);

const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;

  font-size: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftButtonContainer = styled(ButtonContainer)`
  left: 0;
`;
const RightButtonContainer = styled(ButtonContainer)`
  right: 0;
`;

let timeoutID;

function IntegerInput({ initialValue, minValue, maxValue, disabled, onSubmitChange }) {
  const [value, setValue] = useState(initialValue);
  const [displayValue, setDisplayValue] = useState('');

  const handleChange = useCallback(
    ({ target }) => {
      setDisplayValue(target.value);
    },
    [setDisplayValue],
  );

  const isMinimumValueReached = value === minValue;
  const isMaximumValueReached = value === maxValue;

  const handleBlur = useCallback(
    ({ target }) => {
      const actualValue = Number.parseInt(target.value, 10);
      if (actualValue <= minValue) {
        setValue(minValue);
        setDisplayValue(minValue.toString());
      } else if (actualValue >= maxValue) {
        setValue(maxValue);
        setDisplayValue(maxValue.toString());
      } else if (Number.isFinite(actualValue)) {
        setValue(actualValue);
        setDisplayValue(actualValue.toString());
      } else {
        setValue(Number.NaN);
        setDisplayValue('');
      }
    },
    [minValue, maxValue],
  );

  useEffect(() => {
    setDisplayValue(value.toString());
  }, [value]);

  useDebounce(value, initialValue, onSubmitChange);
  return (
    <Root disabled={disabled}>
      <LeftButtonContainer>
        <IconButton
          disabled={disabled || isMinimumValueReached}
          onClick={() => setValue(value - 1)}
        >
          <MdRemove />
        </IconButton>
      </LeftButtonContainer>
      <ResetInput
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        disabled={disabled}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        width="6rem"
        textAlign="center"
      />
      <RightButtonContainer>
        <IconButton
          disabled={disabled || isMaximumValueReached}
          onClick={() => setValue(value + 1)}
        >
          <MdAdd />
        </IconButton>
      </RightButtonContainer>
    </Root>
  );
}

IntegerInput.propTypes = {
  disabled: PropTypes.bool,
  initialValue: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  onSubmitChange: PropTypes.func.isRequired,
};

IntegerInput.defaultProps = {
  disabled: false,
};

export default IntegerInput;
