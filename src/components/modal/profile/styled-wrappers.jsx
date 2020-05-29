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

export const TopRow = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: auto 8rem;
  width: 100%;
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
`;

export const Title = styled.header(
  styles.head,
  css`
    text-align: center;
    width: 100%;
    padding-bottom: 1rem;
  `,
);

export const InstructionsContainer = styled.div(
  styles.body1,
  css`
    text-align: center;
    width: 100%;
    padding-bottom: 0.5rem;
  `,
);

export const Footer = styled.footer`
  display: flex;
  padding-bottom: 1rem;
`;
