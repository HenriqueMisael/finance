import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import transactionMethodList from '../../../store/transaction-method-list';
import TransactionMethodListItemPreview from '../../../components/transaction-method-list/item/preview';

const { getDescriptionByTransactionMethodID } = transactionMethodList.selectors;
const { transactionMethodListDeleteAsync } = transactionMethodList.creators;

function TransactionMethodListItemPreviewWired({ transactionMethodID }) {
  const description = useSelector((state) =>
    getDescriptionByTransactionMethodID(state).get(transactionMethodID),
  );

  const dispatch = useDispatch();
  const handleDelete = useCallback(() => {
    return dispatch(transactionMethodListDeleteAsync(transactionMethodID));
  }, [dispatch, transactionMethodID]);

  return (
    <TransactionMethodListItemPreview description={description} onDelete={handleDelete} />
  );
}

TransactionMethodListItemPreviewWired.propTypes = {
  transactionMethodID: PropTypes.string.isRequired,
};

export default TransactionMethodListItemPreviewWired;
