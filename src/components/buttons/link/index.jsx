import React from 'react';
import PropTypes from 'prop-types';

import { Root } from './styled-wrappers';

function LinkButton({ onClick, children, disabled }) {
  return (
    <Root disabled={disabled} onClick={onClick}>
      {children}
    </Root>
  );
}

LinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

LinkButton.defaultProps = {
  disabled: false,
};

export default React.memo(LinkButton);
