import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VisibleBalance from './visible-balance';
import NotVisibleBalance from './not-visible-balance';

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  font-size: 1.5rem;
  padding: 2rem 0;
  height: 5rem;
  width: 100%;
`;

function TotalBalance({ totalBalance }) {
  const [visible, setVisible] = useState(false);

  return (
    <Root>
      {visible ? (
        <VisibleBalance totalBalance={totalBalance} setVisible={setVisible} />
      ) : (
        <NotVisibleBalance setVisible={setVisible} />
      )}
    </Root>
  );
}

TotalBalance.propTypes = {
  totalBalance: PropTypes.number.isRequired,
};

export default TotalBalance;
