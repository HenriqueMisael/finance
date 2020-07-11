import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import transactionMethodList from '../../../store/transaction-method-list';
import TransactionMethodListItemSelected from '../../../components/transaction-method-list/item/selected';

import TransactionMethodListItemSaveButtonWired from './save-button-wired';
import TransactionMethodListItemCancelButtonWired from './cancel-button-wired';

const { getDescriptionByTransactionMethodID } = transactionMethodList.selectors;
const {
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

  return (
    <TransactionMethodListItemSelected
      slotSaveButton={<TransactionMethodListItemSaveButtonWired />}
      slotCancelButton={<TransactionMethodListItemCancelButtonWired />}
      description={description}
      onChange={handleChange}
    />
  );
}

TransactionMethodListItemSelectedWired.propTypes = {
  transactionMethodID: PropTypes.string.isRequired,
};

export default TransactionMethodListItemSelectedWired;
