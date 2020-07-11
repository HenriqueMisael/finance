import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import transactionMethodList from '../../../store/transaction-method-list';
import IconButton from '../../../components/buttons/icon';

const { transactionMethodListDeleteAsync } = transactionMethodList.creators;

function TransactionMethodListItemDeleteButtonWired({ transactionMethodID }) {
  const dispatch = useDispatch();

  const handleDelete = useCallback(() => {
    dispatch(transactionMethodListDeleteAsync(transactionMethodID));
  }, [dispatch, transactionMethodID]);

  return (
    <IconButton
      ariaLabel="Delete entry"
      ariaLabelledby={`transactionMethod-${transactionMethodID}`}
      onClick={handleDelete}
    >
      <MdDelete />
    </IconButton>
  );
}

TransactionMethodListItemDeleteButtonWired.propTypes = {
  transactionMethodID: PropTypes.string.isRequired,
};

export default TransactionMethodListItemDeleteButtonWired;
