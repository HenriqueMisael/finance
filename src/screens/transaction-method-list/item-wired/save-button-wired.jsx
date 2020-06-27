import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdCheck } from 'react-icons/md';

import IconButton from '../../../components/buttons/icon';
import transactionMethodList from '../../../store/transaction-method-list';

const { transactionMethodListSaveAsync } = transactionMethodList.creators;
const { getDescription } = transactionMethodList.editing.selectors;

function TransactionMethodListItemSaveButtonWired() {
  const isDisabled = useSelector((state) => getDescription(state) === '');

  const dispatch = useDispatch();

  const handleSave = useCallback(() => {
    dispatch(transactionMethodListSaveAsync());
  }, [dispatch]);

  return (
    <IconButton
      disabled={isDisabled}
      ariaLabel="Save transaction method list"
      onClick={handleSave}
      noPadding
    >
      <MdCheck />
    </IconButton>
  );
}

export default TransactionMethodListItemSaveButtonWired;
