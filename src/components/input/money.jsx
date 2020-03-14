import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import format from '../../utils/format';
import parse from '../../utils/parse';
import useDebounce from '../../hooks/use-debounce';
import styles from '../styles';

import ResetInput from './reset';

const Root = styled.div(
  styles.input,
  css`
    position: relative;
    width: 8rem;
  `,
);

const CurrencyText = styled.span(
  styles.text,
  styles.body1,
  css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0.5rem;

    display: flex;
    justify-content: center;
    align-items: center;
  `,
);

function MoneyInput({ initialValue, disabled, onSubmitChange }) {
  const [value, setValue] = useState(initialValue);
  const [displayValue, setDisplayValue] = useState('');

  const handleChange = useCallback(
    ({ target }) => {
      setDisplayValue(target.value);
    },
    [setDisplayValue],
  );

  const handleBlur = useCallback(({ target }) => {
    const actualValue = parse.money(target.value);
    if (Number.isFinite(actualValue)) {
      setValue(actualValue);
      setDisplayValue(format.money(actualValue));
    } else {
      setValue(Number.NaN);
      setDisplayValue('');
    }
  }, []);

  const handleFocus = useCallback(() => {
    if (value === 0) setDisplayValue('');
  }, [value, setDisplayValue]);

  useEffect(() => {
    setDisplayValue(format.money(value));
  }, [value]);

  useDebounce(value, setValue, initialValue, onSubmitChange, 0);
  return (
    <Root disabled={disabled}>
      <CurrencyText disabled={disabled}>R$</CurrencyText>
      <ResetInput
        type="text"
        inputmode="numeric"
        disabled={disabled}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        width="100%"
        textAlign="right"
        step="0.01"
      />
    </Root>
  );
}

MoneyInput.propTypes = {
  disabled: PropTypes.bool,
  initialValue: PropTypes.number.isRequired,
  onSubmitChange: PropTypes.func.isRequired,
};

MoneyInput.defaultProps = {
  disabled: false,
};

export default MoneyInput;
