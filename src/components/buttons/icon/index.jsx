import React from 'react';
import PropTypes from 'prop-types';

import { Root } from './styled-wrappers';

function IconButton({ ariaLabel, ariaLabelledby, onClick, children, disabled }) {
  return (
    <Root
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Root>
  );
}

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  ariaLabelledby: PropTypes.string,
  disabled: PropTypes.bool,
};

IconButton.defaultProps = {
  disabled: false,
  ariaLabelledby: null,
};

export default React.memo(IconButton);
