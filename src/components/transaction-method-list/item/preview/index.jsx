import React from 'react';
import PropTypes from 'prop-types';
import { Body1 } from '../../../text';

function TransactionMethodListItemPreview({ description, onDelete }) {
  return <Body1>{description}</Body1>;
}

TransactionMethodListItemPreview.propTypes = {
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TransactionMethodListItemPreview;
