import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Root = styled.div`
  height: 100%;
  width: 100%;
`;

const ItemsContainer = styled.div`
  padding: 0.5rem;
  overflow-y: auto;
`;

function EntryList({ children }) {
  return (
    <Root>
      <ItemsContainer>{children}</ItemsContainer>
    </Root>
  );
}

EntryList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(EntryList);
