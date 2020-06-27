import styled, { css } from 'styled-components';

import styles from '../../styles';

// eslint-disable-next-line import/prefer-default-export
export const Root = styled.button(
  styles.body1,
  styles.button,
  ({ theme, noPadding }) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: ${noPadding ? '0' : '0.25rem 0.25rem'};

    border-radius: 50%;
    background: transparent;

    font-size: 1.5em;
    color: ${theme.text.primary};

    transition: background 0.25s ease-in-out;

    &:hover {
      background: ${theme.button.accent};
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
