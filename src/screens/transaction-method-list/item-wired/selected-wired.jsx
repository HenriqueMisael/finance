import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import transactionMethodList from '../../../store/transaction-method-list';
import TransactionMethodListItemSelected from '../../../components/transaction-method-list/item/selected';

const { getDescriptionByTransactionMethodID } = transactionMethodList.selectors;
const { transactionMethodListSaveAsync } = transactionMethodList.creators;
const { transactionMethodListEditingClear } = transactionMethodList.editing.creators;

function TransactionMethodListItemSelectedWired({ transactionMethodID }) {
  const description = useSelector((state) =>
    getDescriptionByTransactionMethodID(state).get(transactionMethodID),
  );

  const dispatch = useDispatch();
  const handleSave = useCallback(() => {
    return dispatch(transactionMethodListSaveAsync());
  }, [dispatch]);
  const handleUnselect = useCallback(() => {
    return dispatch(transactionMethodListEditingClear());
  }, [dispatch]);

  return (
    <TransactionMethodListItemSelected
      description={description}
      onSave={handleSave}
      onBlur={handleUnselect}
    />
  );
}

TransactionMethodListItemSelectedWired.propTypes = {
  transactionMethodID: PropTypes.string.isRequired,
};

export default TransactionMethodListItemSelectedWired;
