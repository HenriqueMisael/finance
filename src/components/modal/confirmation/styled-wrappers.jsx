import styled, { css } from 'styled-components';

import styles from '../../styles';

export const Root = styled.div(
  styles.modal,
  ({ visible, height }) => css`
    bottom: ${visible ? 0 : `-${height}`};
    right: 0;
    left: 0;
    display: flex;
    height: ${height};
    padding-top: 1rem;
    align-items: center;
    flex-direction: column;
  `,
);

export const Footer = styled.footer`
  display: flex;
  padding: 1rem 0;
`;
