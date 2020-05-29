import React from 'react';
import PropTypes from 'prop-types';

import { Root } from './styled-wrappers';

function PrimaryButton({ onClick, children, disabled }) {
  return (
    <Root disabled={disabled} onClick={onClick}>
      {children}
    </Root>
  );
}

PrimaryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

PrimaryButton.defaultProps = {
  disabled: false,
};

export default React.memo(PrimaryButton);
