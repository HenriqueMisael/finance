import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Root = styled.div`
  height: 100%;
  width: 100%;
  padding: 0.5rem;
  overflow-y: auto;
`;

function EntryList({ children }) {
  return <Root>{children}</Root>;
}

EntryList.propTypes = { children: PropTypes.node.isRequired };

export default EntryList;
