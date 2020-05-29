import styled, { css } from 'styled-components';

import styles from '../../styles';

// eslint-disable-next-line import/prefer-default-export
export const Root = styled.button(
  styles.button,
  styles.body1,
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 6rem;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    background: ${theme.button.primary.background};

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
