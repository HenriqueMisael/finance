import React from 'react';
import PropTypes from 'prop-types';

import { Root } from './styled-wrappers';

function TransactionMethodList({ children }) {
  return <Root>{children}</Root>;
}

TransactionMethodList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TransactionMethodList;
