import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import styles from '../styles';

const Root = styled.button(
  styles.text,
  styles.button,
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    opacity: 50%;
    transition-property: opacity;

    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    background: ${theme.background.primary};

    font-size: 1.75rem;
    font-weight: ${theme.font.weight.medium};
    color: ${theme.button.primary.text};

    &:hover {
      opacity: 60%;
    }
    &:active {
      opacity: 80%;
    }
    &[disabled] {
      cursor: not-allowed;
      background: ${theme.background.disabled};
      color: ${theme.text.disabled};
      opacity: 30%;
      &:hover {
        opacity: 30%;
      }
      &:active {
        opacity: 30%;
      }
    }
  `,
);

function ListItemButton({ onClick, children, disabled }) {
  return (
    <Root disabled={disabled} onClick={onClick}>
      {children}
    </Root>
  );
}

ListItemButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

ListItemButton.defaultProps = {
  disabled: false,
};

export default React.memo(ListItemButton);
