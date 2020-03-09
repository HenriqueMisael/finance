import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import styles from '../../styles';

const Root = styled.div`
  padding: 0.125rem;
`;

const Track = styled.div`
  position: relative;
  background-color: ${({ theme, active }) =>
    active ? theme.button.primary.background : theme.background.secondary};
  border-radius: 0.5rem;
  border-color: ${({ theme }) => theme.border.primary};
  height: 1em;
  width: 3em;
  overflow: visible;
`;

const Indicator = styled.div(
  styles.button,
  ({ theme, active }) => css`
    position: absolute;
    top: -25%;
    left: ${active ? 'calc(100% - 1.5em)' : 0};

    transition: left 0.5s, background-color 1s linear 2s;

    background: ${active ? theme.button.primary.active : theme.button.primary.background};
    height: 1.5em;
    width: 1.5em;
    border-radius: 50%;
  `,
);

function ToggleButton() {
  const [active, setActive] = useState(false);
  const handleClick = useCallback(() => {
    setActive((previous) => !previous);
  }, [setActive]);

  return (
    <Root>
      <Track active={active}>
        <Indicator onClick={handleClick} active={active} />
      </Track>
    </Root>
  );
}

ToggleButton.propTypes = {
  value: PropTypes.bool.isRequired,
};

export default ToggleButton;
