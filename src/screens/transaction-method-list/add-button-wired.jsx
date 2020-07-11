import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import i18next from 'i18next';

import transactionMethodList from '../../store/transaction-method-list';
import IconButton from '../../components/buttons/icon';

const { transactionMethodListAddAsync } = transactionMethodList.creators;

function AddButtonWired() {
  const dispatch = useDispatch();

  const handleAdd = useCallback(() => {
    dispatch(transactionMethodListAddAsync());
  }, [dispatch]);

  return (
    <IconButton onClick={handleAdd} ariaLabel={i18next.t('transactionMethodList.add')}>
      <MdAdd />
    </IconButton>
  );
}

export default AddButtonWired;
