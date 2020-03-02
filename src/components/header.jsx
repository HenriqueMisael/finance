import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import styles from './styles';

const Root = styled.div`
  position: relative;
  display: flex;
  background: ${({ theme }) => theme.background.secondary};
  flex: 1;
  padding: 1rem;
  justify-content: center;
`;

const ButtonContainer = styled.div(
  css`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5rem;
  `,
  styles.title,
);

const Title = styled.span(
  styles.text,
  styles.title,
  ({ theme }) => css`
    color: ${theme.text.primary};
  `,
);

function Header({ slotButton, children }) {
  return (
    <Root>
      <ButtonContainer>{slotButton}</ButtonContainer>
      <Title>{children}</Title>
    </Root>
  );
}

Header.propTypes = {
  slotButton: PropTypes.node.isRequired,
  children: PropTypes.string.isRequired,
};

export default Header;
