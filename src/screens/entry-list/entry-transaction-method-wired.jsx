import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import entryList from '../../store/entry-list';
import TransactionMethodDropdownWired from '../../wired-components/transaction-method-dropdown-wired';

const { getTransactionMethod } = entryList.editing.selectors;
const { entryListEditingSetTransactionMethod } = entryList.editing.creators;

function EntryTransactionMethodWired() {
  const transactionMethod = useSelector(getTransactionMethod);

  const dispatch = useDispatch();

  const handleSelect = useCallback(
    (newTransactionMethod) =>
      dispatch(entryListEditingSetTransactionMethod(newTransactionMethod)),
    [dispatch],
  );

  return (
    <TransactionMethodDropdownWired
      selected={transactionMethod}
      onSelect={handleSelect}
    />
  );
}

export default EntryTransactionMethodWired;
