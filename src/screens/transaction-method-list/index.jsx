import React from 'react';
import { useSelector } from 'react-redux';

import transactionMethodList from '../../store/transaction-method-list';
import TransactionMethodList from '../../components/transaction-method-list';

import TransactionMethodListItemWired from './item-wired';
import TransactionMethodListAddingItemWired from './adding-item-wired';
import AddButtonWired from './add-button-wired';

const { getTransactionMethodIDs } = transactionMethodList.selectors;

function TransactionMethodListScreen() {
  const transactionMethodIDs = useSelector(getTransactionMethodIDs);

  return (
    <TransactionMethodList slotButtonAdd={<AddButtonWired />}>
      {transactionMethodIDs.map((transactionMethodID) => (
        <TransactionMethodListItemWired
          key={transactionMethodID}
          transactionMethodID={transactionMethodID}
        />
      ))}
      <TransactionMethodListAddingItemWired />
    </TransactionMethodList>
  );
}

export default TransactionMethodListScreen;
