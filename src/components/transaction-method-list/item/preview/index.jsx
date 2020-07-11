import React from 'react';
import PropTypes from 'prop-types';

import { Body1 } from '../../../text';

import { Root, ButtonContainer } from './styled-wrappers';

function TransactionMethodListItemPreview({ description, slotButton }) {
  return (
    <Root>
      <Body1>{description}</Body1>
      <ButtonContainer>{slotButton}</ButtonContainer>
    </Root>
  );
}

TransactionMethodListItemPreview.propTypes = {
  description: PropTypes.string.isRequired,
  slotButton: PropTypes.node.isRequired,
};

export default TransactionMethodListItemPreview;
