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

function NumberInput({ initialValue, disabled, onSubmitChange }) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    ({ target }) => {
      setValue(target.value);
    },
    [setValue],
  );

  timeoutID = useDebounce(timeoutID, value, initialValue, onSubmitChange);

  return (
    <Root disabled={disabled}>
      <LeftButtonContainer>
        <IconButton disabled={disabled} onClick={() => setValue(value - 1)}>
          <MdRemove />
        </IconButton>
      </LeftButtonContainer>
      <ResetInput
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        disabled={disabled}
        value={value}
        onChange={handleChange}
        width="6rem"
        center
      />
      <RightButtonContainer>
        <IconButton disabled={disabled} onClick={() => setValue(value + 1)}>
          <MdAdd />
        </IconButton>
      </RightButtonContainer>
    </Root>
  );
}

NumberInput.propTypes = {
  disabled: PropTypes.bool,
  initialValue: PropTypes.number.isRequired,
  onSubmitChange: PropTypes.func.isRequired,
};

export default NumberInput;
