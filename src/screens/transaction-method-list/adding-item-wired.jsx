import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import transactionMethodList from '../../store/transaction-method-list';
import TransactionMethodListItemWrapper from '../../components/transaction-method-list/item';

const { getIsAdding, getDescription } = transactionMethodList.editing.selectors;
const {
  transactionMethodListEditingSetDescription,
} = transactionMethodList.editing.creators;
const { transactionMethodListSaveAsync } = transactionMethodList.creators;

function TransactionMethodListAddingItemWired() {
  const isAdding = useSelector(getIsAdding);
  const description = useSelector((state) => getDescription(state));

  const dispatch = useDispatch();

  const handleSave = useCallback(
    (newDescription) => {
      dispatch(transactionMethodListEditingSetDescription(newDescription));
      dispatch(transactionMethodListSaveAsync());
    },
    [dispatch],
  );

  return (
    isAdding && (
      <TransactionMethodListItemWrapper
        description={description}
        onSave={handleSave}
        onClick={() => false}
        selected
      />
    )
  );
}

export default TransactionMethodListAddingItemWired;
