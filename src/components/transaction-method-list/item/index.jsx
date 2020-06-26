import React from 'react';
import PropTypes from 'prop-types';

import { Root } from './styled-wrappers';

function TransactionMethodListItemWrapper({ selected, onClick, children }) {
  return (
    <Root selected={selected} onClick={onClick}>
      {children}
    </Root>
  );
}

TransactionMethodListItemWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default TransactionMethodListItemWrapper;
