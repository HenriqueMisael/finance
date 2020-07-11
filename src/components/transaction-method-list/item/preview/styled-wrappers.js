import styled, { css } from 'styled-components';

import styles from '../../../styles';

export const Root = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div(
  styles.body2,
  ({ theme }) => css`
    color: ${theme.text.secondary};
  `,
);
