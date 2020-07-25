import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import transactionMethodList from '../../store/transaction-method-list';
import TransactionMethodListItemSelected from '../../components/transaction-method-list/item/selected';
import TransactionMethodListItemWrapper from '../../components/transaction-method-list/item';

const { getIsAdding, getDescription } = transactionMethodList.editing.selectors;
const {
  transactionMethodListEditingSetDescription,
  transactionMethodListEditingClear,
} = transactionMethodList.editing.creators;
const { transactionMethodListSaveAsync } = transactionMethodList.creators;

function TransactionMethodListAddingItemWired() {
  const isAdding = useSelector(getIsAdding);
  const description = useSelector((state) => getDescription(state));

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
    isAdding && (
      <TransactionMethodListItemWrapper selected>
        <TransactionMethodListItemSelected
          description={description}
          onSave={handleSave}
          onCancel={handleCancel}
          onChange={handleChange}
        />
      </TransactionMethodListItemWrapper>
    )
  );
}

export default TransactionMethodListAddingItemWired;
