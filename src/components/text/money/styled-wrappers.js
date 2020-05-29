import styled, { css } from 'styled-components';

import styles from '../../styles';

// eslint-disable-next-line import/prefer-default-export
export const Root = styled.span(
  styles.body1,
  ({ theme, positive }) => css`
    font-weight: ${theme.font.weight.medium};
    color: ${positive ? theme.text.positive : theme.text.negative};
  `,
);
