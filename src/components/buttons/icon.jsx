import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import styles from '../styles';

const Root = styled.button(
  styles.text,
  styles.button,
  ({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.25rem 0.25rem;
    border-radius: 50%;
    background: transparent;

    font-size: 1.5em;
    color: ${theme.text.primary};

    transition: background 0.25s ease-in-out;

    &:hover {
      background: ${theme.background.accent};
    }
    &:active {
    }
    &[disabled] {
      cursor: not-allowed;
      color: ${theme.button.disabled.text};
      &:hover {
        background: transparent;
        box-shadow: none;
      }
      &:active {
        background: none;
      }
    }
  `,
);

function IconButton({ onClick, children, disabled }) {
  return (
    <Root disabled={disabled} onClick={onClick}>
      {children}
    </Root>
  );
}

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

IconButton.defaultProps = {
  disabled: false,
};

export default React.memo(IconButton);
