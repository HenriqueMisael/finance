import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  background: ${({ theme }) => theme.background.default};
`;

function HomeScreen() {
  return <Root />;
}

export default HomeScreen;
