import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '../styles';

const Root = styled.div`
  background: ${({ theme, active }) =>
    active ? theme.background.default : 'transparent'};
  padding: 0.5rem 1rem;
  cursor: ${({active}) => active ? 'default' : 'pointer'};
  width: 100%;

  transition: background 0.25s ease-in-out;

  &:hover {
    background: ${({ theme, active }) =>
      active ? theme.background.default : theme.background.accent};
  }
`;

const Text = styled.span(styles.text, styles.body1);

function MenuItem({ children, active, onClick }) {
  return (
    <Root active={active} onClick={onClick}>
      <Text>{children}</Text>
    </Root>
  );
}

MenuItem.propTypes = {
  children: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MenuItem;
