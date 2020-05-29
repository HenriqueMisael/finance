import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import useDebounce from '../../../hooks/use-debounce';
import styles from '../../styles';
import { Body2 } from '../../text';

const Root = styled.div`
  padding: 0.125rem;
  display: flex;
  align-items: center;
`;

const LeftText = styled(Body2)`
  padding-right: 1rem;
`;
const RightText = styled(Body2)`
  padding-left: 1rem;
`;

const Track = styled.div`
  position: relative;
  background-color: ${({ theme, active }) =>
    active ? theme.button.primary.background : theme.background.secondary};
  border-radius: 0.5rem;
  border-color: ${({ theme }) => theme.border.primary};
  height: 1em;
  width: 2em;
  overflow: visible;

  transition-duration: 0.25s;
  transition-property: background-color;
`;

const Indicator = styled.div(
  styles.button,
  ({ theme, active }) => css`
    position: absolute;
    top: -25%;
    left: ${active ? 'calc(100% - 0.75em)' : '-0.75em'};

    transition-property: left;
    transition-duration: 0.25s;

    background: ${active ? theme.button.primary.active : theme.button.primary.background};
    height: 1.5em;
    width: 1.5em;
    border-radius: 50%;
  `,
);

function ToggleButton({ initialValue, onChange, steps }) {
  const [active, setActive] = useState(initialValue);
  const handleClick = useCallback(() => {
    setActive((previous) => !previous);
  }, [setActive]);

  const falseValue = steps.length === 2 ? steps[0] : null;
  const trueValue = falseValue ? steps[1] : steps.length === 1 && steps[0];

  useDebounce(active, setActive, initialValue, onChange, 0);

  return (
    <Root>
      <LeftText>{falseValue}</LeftText>
      <Track active={active}>
        <Indicator onClick={handleClick} active={active} />
      </Track>
      <RightText>{trueValue}</RightText>
    </Root>
  );
}

ToggleButton.propTypes = {
  initialValue: PropTypes.bool.isRequired,
  steps: PropTypes.arrayOf(PropTypes.node),
  onChange: PropTypes.func.isRequired,
};

ToggleButton.defaultProps = {
  steps: [],
};

export default ToggleButton;
