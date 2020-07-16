import styled, { css } from 'styled-components';

import styles from '../../styles';

export const Root = styled.select(styles.input, styles.body1);

export const Option = styled.option(
  styles.body2,
  css`
    &[selected] {
      border: red thin solid;
    }
  `,
);
