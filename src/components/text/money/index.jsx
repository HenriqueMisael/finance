import React from 'react';
import PropTypes from 'prop-types';

import format from '../../../utils/format';

import { Root } from './styled-wrappers';

function MoneyText({ children }) {
  const moneyValue = format.money(Math.abs(children));

  return <Root positive={children > 0}>{`R$ ${moneyValue}`}</Root>;
}

MoneyText.propTypes = {
  children: PropTypes.number.isRequired,
};

export default React.memo(MoneyText);
