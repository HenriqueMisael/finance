import styled, { css } from 'styled-components';
import styles from '../styles';

export const Root = styled.div(
  () => css`
    padding: 0.5rem;
  `,
);

export const Table = styled.div(
  ({ theme }) => css`
    height: 100%;
    width: 100%;
    overflow-y: auto;

    border-radius: 0.25rem;
    border-style: solid;
    border-width: 1px;
    border-color: ${theme.border.secondary};
  `,
);

export const THead = styled.div(
  styles.head2,
  ({ theme }) =>
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.5rem;
      background-color: ${theme.background.accent};
      color: ${theme.text.primary};
    `,
);

export const TBody = styled.div(
  ({ theme }) => css`
    padding: 0.25rem 0;
    background-color: ${theme.background.primary};
  `,
);
