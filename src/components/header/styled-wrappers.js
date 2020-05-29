import styled, { css } from 'styled-components';

import styles from '../styles';

export const Root = styled.div`
  position: relative;
  display: flex;
  background: ${({ theme }) => theme.background.primary};
  padding: 1rem;
  justify-content: center;
`;

export const ButtonContainer = styled.div(
  css`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5rem;
  `,
  styles.head,
);

export const Title = styled.span(
  styles.head,
  ({ theme }) => css`
    color: ${theme.text.primary};
  `,
);
