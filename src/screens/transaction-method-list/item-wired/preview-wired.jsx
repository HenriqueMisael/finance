import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import transactionMethodList from '../../../store/transaction-method-list';
import TransactionMethodListItemPreview from '../../../components/transaction-method-list/item/preview';

import TransactionMethodListItemDeleteButtonWired from './delete-button-wired';

const { getDescriptionByTransactionMethodID } = transactionMethodList.selectors;

function TransactionMethodListItemPreviewWired({ transactionMethodID }) {
  const description = useSelector((state) =>
    getDescriptionByTransactionMethodID(state).get(transactionMethodID),
  );

  return (
    <TransactionMethodListItemPreview
      slotButton={
        <TransactionMethodListItemDeleteButtonWired
          transactionMethodID={transactionMethodID}
        />
      }
      description={description}
    />
  );
}

TransactionMethodListItemPreviewWired.propTypes = {
  transactionMethodID: PropTypes.string.isRequired,
};

export default TransactionMethodListItemPreviewWired;
