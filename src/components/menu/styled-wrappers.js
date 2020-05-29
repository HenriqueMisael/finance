import styled, { css } from 'styled-components';

import styles from '../styles';

export const Root = styled.div(
  styles.modal,
  css`
    width: 90vw;
    height: 100vh;
    left: ${({ visible }) => (visible ? 0 : '-100vw')};
  `,
);

export const OptionTray = styled.div`
  padding: 1rem;
`;
