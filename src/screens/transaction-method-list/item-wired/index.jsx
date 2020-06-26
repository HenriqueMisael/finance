import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import transactionMethodList from '../../../store/transaction-method-list';
import TransactionMethodListItemWrapper from '../../../components/transaction-method-list/item';

import TransactionMethodListItemSelectedWired from './selected-wired';
import TransactionMethodListItemPreviewWired from './preview-wired';

const { getIsSelectedByTransactionMethodID } = transactionMethodList.selectors;
const { transactionMethodListEditAsync } = transactionMethodList.creators;

function TransactionMethodListItemWired({ transactionMethodID }) {
  const isSelected = useSelector((state) =>
    getIsSelectedByTransactionMethodID(state).get(transactionMethodID),
  );

  const dispatch = useDispatch();
  const handleSelect = useCallback(() => {
    return dispatch(transactionMethodListEditAsync(transactionMethodID));
  }, [dispatch, transactionMethodID]);

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
