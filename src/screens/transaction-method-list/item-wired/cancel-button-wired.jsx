import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { MdBlock } from 'react-icons/md';

import IconButton from '../../../components/buttons/icon';
import transactionMethodList from '../../../store/transaction-method-list';

const { transactionMethodListEditingClear } = transactionMethodList.editing.creators;

function TransactionMethodListItemCancelButtonWired() {
  const dispatch = useDispatch();

  const handleCancel = useCallback(() => {
    dispatch(transactionMethodListEditingClear());
  }, [dispatch]);

  return (
    <IconButton
      ariaLabel="Cancel transaction method list"
      onClick={handleCancel}
      noPadding
    >
      <MdBlock />
    </IconButton>
  );
}

export default TransactionMethodListItemCancelButtonWired;
