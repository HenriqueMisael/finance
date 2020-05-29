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
