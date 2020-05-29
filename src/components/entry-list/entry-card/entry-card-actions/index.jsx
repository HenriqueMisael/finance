import React from 'react';
import PropTypes from 'prop-types';

import { Root } from './styled-wrappers';

function EntryCardActions({ children }) {
  return <Root>{children}</Root>;
}

EntryCardActions.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EntryCardActions;
