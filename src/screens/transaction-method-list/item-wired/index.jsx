import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import transactionMethodList from '../../../store/transaction-method-list';
import TransactionMethodListItemWrapper from '../../../components/transaction-method-list/item';

import TransactionMethodListItemSelectedWired from './selected-wired';
import TransactionMethodListItemPreviewWired from './preview-wired';

const { getIsSelectedByTransactionMethodID } = transactionMethodList.selectors;
const { transactionMethodListEditAsync } = transactionMethodList.creators;
const { getID } = transactionMethodList.editing.selectors;

function TransactionMethodListItemWired({ transactionMethodID }) {
  const isSelected = useSelector((state) =>
    getIsSelectedByTransactionMethodID(state).get(transactionMethodID),
  );
  const selectedTransactionMethodID = useSelector((state) => getID(state));

  const dispatch = useDispatch();
  const handleSelect = useCallback(() => {
    if (selectedTransactionMethodID === transactionMethodID) return;
    dispatch(transactionMethodListEditAsync(transactionMethodID));
  }, [dispatch, transactionMethodID, selectedTransactionMethodID]);

  return (
    <TransactionMethodListItemWrapper onClick={handleSelect} selected={isSelected}>
      {isSelected ? (
        <TransactionMethodListItemSelectedWired
          transactionMethodID={transactionMethodID}
        />
      ) : (
        <TransactionMethodListItemPreviewWired
          transactionMethodID={transactionMethodID}
        />
      )}
    </TransactionMethodListItemWrapper>
  );
}

TransactionMethodListItemWired.propTypes = {
  transactionMethodID: PropTypes.string.isRequired,
};

export default TransactionMethodListItemWired;
