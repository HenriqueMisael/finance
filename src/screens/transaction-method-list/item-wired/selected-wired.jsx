import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import transactionMethodList from '../../../store/transaction-method-list';
import TransactionMethodListItemSelected from '../../../components/transaction-method-list/item/selected';

import TransactionMethodListItemSaveButtonWired from './save-button-wired';

const { getDescriptionByTransactionMethodID } = transactionMethodList.selectors;
const {
  transactionMethodListEditingClear,
  transactionMethodListEditingSetDescription,
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
  const handleUnselect = useCallback(() => {
    return dispatch(transactionMethodListEditingClear());
  }, [dispatch]);

  return (
    <TransactionMethodListItemSelected
      slotSaveButton={<TransactionMethodListItemSaveButtonWired />}
      description={description}
      onChange={handleChange}
      onBlur={handleUnselect}
    />
  );
}

TransactionMethodListItemSelectedWired.propTypes = {
  transactionMethodID: PropTypes.string.isRequired,
};

export default TransactionMethodListItemSelectedWired;
