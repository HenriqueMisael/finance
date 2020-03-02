import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import styles from '../styles';

const Root = styled.button(
  styles.text,
  styles.button,
  ({ theme }) => css`
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    background: ${theme.button.primary.background};

    font-size: 1em;
    font-weight: ${theme.font.weight.medium};
    color: ${theme.button.primary.text};

    &:hover {
      box-shadow: inset 0 0 1.5rem ${theme.button.primary.active};
    }
    &:active {
      background: ${theme.button.primary.active};
    }
    &[disabled] {
      cursor: not-allowed;
      background: ${theme.button.disabled.background};
      color: ${theme.button.disabled.text};
      &:hover {
        box-shadow: none;
      }
      &:active {
        background: none;
      }
    }
  `,
);

function PrimaryButton({ onClick, children, disabled }) {
  return <Root disabled={disabled} onClick={onClick}>{children}</Root>;
}

PrimaryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default PrimaryButton;
