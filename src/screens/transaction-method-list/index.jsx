import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdd } from 'react-icons/md';

import transactionMethodList from '../../store/transaction-method-list';
import ListItemButton from '../../components/buttons/list-item';
import TransactionMethodList from '../../components/transaction-method-list';

import TransactionMethodListItemWired from './item-wired';
import TransactionMethodListAddingItemWired from './adding-item-wired';

const { getTransactionMethodIDs } = transactionMethodList.selectors;
const { transactionMethodListAddAsync } = transactionMethodList.creators;

function TransactionMethodListScreen() {
  const transactionMethodIDs = useSelector(getTransactionMethodIDs);

  const dispatch = useDispatch();

  const handleAdd = useCallback(() => {
    dispatch(transactionMethodListAddAsync());
  }, [dispatch]);

  return (
    <TransactionMethodList>
      {transactionMethodIDs.map((transactionMethodID) => (
        <TransactionMethodListItemWired
          key={transactionMethodID}
          transactionMethodID={transactionMethodID}
        />
      ))}
      <TransactionMethodListAddingItemWired />
      <ListItemButton onClick={handleAdd}>
        <MdAdd />
      </ListItemButton>
    </TransactionMethodList>
  );
}

export default TransactionMethodListScreen;
