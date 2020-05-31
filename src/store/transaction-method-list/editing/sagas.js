import { all, put, select, takeLeading } from 'redux-saga/effects';

import core from '../../core';
import TransactionMethodModel from '../../core/model/transaction-method';

import Selectors from './selectors';
import { Types } from './duck';

const { getNextID } = core.selectors;
const { getIsEditing, getID, getDescription } = Selectors;

function* watchSubmit() {
  const isEditing = yield select(getIsEditing);

  const [id, description] = [
    yield select(isEditing ? getNextID : getID),
    yield select(getDescription),
  ];
  const transactionMethod = TransactionMethodModel(id, description);
  yield all([
    put(core.creators.coreUpsertTransactionMethod(transactionMethod)),
    put(core.creators.coreRegisterId(id)),
  ]);
}

export default [
  takeLeading([Types.TRANSACTION_METHOD_LIST_EDITING_SUBMIT_ASYNC], watchSubmit),
];
