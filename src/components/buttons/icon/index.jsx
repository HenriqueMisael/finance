import React from 'react';
import PropTypes from 'prop-types';

import { Root } from './styled-wrappers';

function IconButton({ onClick, children, disabled }) {
  return (
    <Root disabled={disabled} onClick={onClick}>
      {children}
    </Root>
  );
}

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

IconButton.defaultProps = {
  disabled: false,
};

export default React.memo(IconButton);
