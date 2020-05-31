import { all, put, select, takeLeading } from 'redux-saga/effects';

import core from '../core';

import { Types } from './duck';
import editing from './editing';

const { getTransactionMethodByTransactionMethodID } = core.selectors;

const {
  transactionMethodListEditingSetID,
  transactionMethodListEditingSetDescription,
} = editing.creators;

function* watchDelete({ transactionMethodID }) {
  yield put(core.creators.coreDeleteTransactionMethod(transactionMethodID));
}

function* watchEdit({ transactionMethodID }) {
  const transactionMethodByTransactionMethodID = yield select(
    getTransactionMethodByTransactionMethodID,
  );
  const { description } = transactionMethodByTransactionMethodID.get(transactionMethodID);

  yield all([
    put(transactionMethodListEditingSetID(transactionMethodID)),
    put(transactionMethodListEditingSetDescription(description)),
  ]);
}

export default [
  takeLeading([Types.TRANSACTION_METHOD_LIST_DELETE_ASYNC], watchDelete),
  takeLeading([Types.TRANSACTION_METHOD_LIST_EDIT_ASYNC], watchEdit),
];
