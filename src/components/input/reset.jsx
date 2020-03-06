import styled, {css} from 'styled-components';

import styles from '../styles';

export default styled.input(
  styles.text,
  styles.body1,
  ({ width, center }) => css`
    border: none;
    outline: none;
    background: none;

    width: ${width};
    ${center ? 'text-align: center' : ''};
  `,
);
