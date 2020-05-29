import styled, { css } from 'styled-components';

import styles from '../styles';

export default styled.input(
  styles.body1,
  ({ width, textAlign = 'start' }) => css`
    border: none;
    outline: none;
    background: none;

    width: ${width};
    text-align: ${textAlign};
  `,
);
