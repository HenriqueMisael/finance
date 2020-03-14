import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background.secondary};
  font-size: 0.8rem;

  width: 2rem;

  border-left-color: ${({ theme }) => theme.border.detail};
  border-left-width: thin;
  border-left-style: solid;
`;

function EntryCardActions({ children }) {
  return <Root>{children}</Root>;
}

EntryCardActions.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EntryCardActions;
