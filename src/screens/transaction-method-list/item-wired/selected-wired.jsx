import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import transactionMethodList from '../../../store/transaction-method-list';
import TransactionMethodListItemSelected from '../../../components/transaction-method-list/item/selected';

const { getDescriptionByTransactionMethodID } = transactionMethodList.selectors;
const { transactionMethodListSaveAsync } = transactionMethodList.creators;
const {
  transactionMethodListEditingSetDescription,
  transactionMethodListEditingClear,
} = transactionMethodList.editing.creators;

function TransactionMethodListItemSelectedWired({ transactionMethodID }) {
  const description = useSelector((state) =>
    getDescriptionByTransactionMethodID(state).get(transactionMethodID),
  );

  const dispatch = useDispatch();

  const handleChange = useCallback(
    (newDescription) => {
      return dispatch(transactionMethodListEditingSetDescription(newDescription));
    },
    [dispatch],
  );

  const handleSave = useCallback(() => {
    dispatch(transactionMethodListSaveAsync());
  }, [dispatch]);

  const handleCancel = useCallback(() => {
    dispatch(transactionMethodListEditingClear());
  }, [dispatch]);

  return (
    <TransactionMethodListItemSelected
      onSave={handleSave}
      onCancel={handleCancel}
      description={description}
      onChange={handleChange}
    />
  );
}

TransactionMethodListItemSelectedWired.propTypes = {
  transactionMethodID: PropTypes.string.isRequired,
};

export default TransactionMethodListItemSelectedWired;
