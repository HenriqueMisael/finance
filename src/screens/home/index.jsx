import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import home from '../../store/home';
import TotalBalance from '../../components/home/total-balance';
import AppTitle from '../../components/app-title';

const { getBalance } = home.selectors;

const Root = styled.div`
  background: ${({ theme }) => theme.background.default};
`;

function HomeScreen() {
  const balance = useSelector(getBalance);

  return (
    <Root>
      <AppTitle screen="home" />
      <TotalBalance totalBalance={balance} />
    </Root>
  );
}

export default HomeScreen;
