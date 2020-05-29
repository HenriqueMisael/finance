import React from 'react';
import PropTypes from 'prop-types';
import { FaRegEye } from 'react-icons/fa';

import IconButton from '../buttons/icon';
import MoneyText from '../text/money';

function VisibleBalance({ setVisible, totalBalance }) {
  return (
    <>
      <IconButton onClick={() => setVisible(false)}>
        <FaRegEye />
      </IconButton>
      <MoneyText>{totalBalance}</MoneyText>
    </>
  );
}

VisibleBalance.propTypes = {
  setVisible: PropTypes.func.isRequired,
  totalBalance: PropTypes.number.isRequired,
};

export default VisibleBalance;
