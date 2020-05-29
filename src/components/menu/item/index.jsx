import React from 'react';
import PropTypes from 'prop-types';

import { Body1 } from '../../text';

import { Root } from './styled-wrappers';

function MenuItem({ children, active, onClick }) {
  return (
    <Root active={active} onClick={onClick}>
      <Body1>{children}</Body1>
    </Root>
  );
}

MenuItem.propTypes = {
  children: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(MenuItem);
