import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import transactionMethodList from '../../store/transaction-method-list';
import TransactionMethodListItemSelected from '../../components/transaction-method-list/item/selected';
import TransactionMethodListItemWrapper from '../../components/transaction-method-list/item';

import TransactionMethodListItemSaveButtonWired from './item-wired/save-button-wired';
import TransactionMethodListItemCancelButtonWired from './item-wired/cancel-button-wired';

const { getIsAdding, getDescription } = transactionMethodList.editing.selectors;
const {
  transactionMethodListEditingSetDescription,
} = transactionMethodList.editing.creators;

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

  return (
    isAdding && (
      <TransactionMethodListItemWrapper selected>
        <TransactionMethodListItemSelected
          slotSaveButton={<TransactionMethodListItemSaveButtonWired />}
          slotCancelButton={<TransactionMethodListItemCancelButtonWired />}
          description={description}
          onChange={handleChange}
        />
      </TransactionMethodListItemWrapper>
    )
  );
}

export default TransactionMethodListAddingItemWired;
