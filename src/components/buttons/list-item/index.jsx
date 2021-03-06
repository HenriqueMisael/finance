import React from 'react';
import PropTypes from 'prop-types';

import { Root } from './styled-wrappers';

function ListItemButton({ onClick, children, disabled }) {
  return (
    <Root disabled={disabled} onClick={onClick}>
      {children}
    </Root>
  );
}

ListItemButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

ListItemButton.defaultProps = {
  disabled: false,
};

export default React.memo(ListItemButton);
