import styled, { css } from 'styled-components';

import styles from '../../styles';

// eslint-disable-next-line import/prefer-default-export
export const Root = styled.button(
  styles.body1,
  styles.button,
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 6rem;
    padding: 0.5rem 1rem;
    background: transparent;

    font-size: 1em;
    font-weight: ${theme.font.weight.medium};
    color: ${theme.text.primary};

    &:hover {
      text-decoration: underline;
    }
    &[disabled] {
      cursor: not-allowed;
      color: ${theme.button.disabled.text};
      &:hover {
        text-decoration: none;
      }
    }
  `,
);
