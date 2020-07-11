import { all, put, select, takeLeading } from 'redux-saga/effects';

import core from '../core';

import { Types } from './duck';
import editing from './editing';

const { getTransactionMethodByTransactionMethodID } = core.selectors;

const {
  transactionMethodListEditingSetID,
  transactionMethodListEditingSetDescription,
  transactionMethodListEditingSetNew,
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
    put(transactionMethodListEditingSetNew(false)),
  ]);
}

function* watchAdd() {
  yield put(editing.creators.transactionMethodListEditingClear());

  const newID = yield select(core.selectors.getNextID);

  yield all([
    put(transactionMethodListEditingSetID(newID)),
    put(transactionMethodListEditingSetNew(true)),
  ]);
}

function* watchSave() {
  const [id, description, isAdding] = [
    yield select(editing.selectors.getID),
    yield select(editing.selectors.getDescription),
    yield select(editing.selectors.getIsAdding),
  ];

  yield all([
    ...(isAdding ? [put(core.creators.coreRegisterId(id))] : []),
    put(core.creators.coreUpsertTransactionMethod({ id, description })),
  ]);
  yield put(editing.creators.transactionMethodListEditingClear());
}

export default [
  takeLeading([Types.TRANSACTION_METHOD_LIST_DELETE_ASYNC], watchDelete),
  takeLeading([Types.TRANSACTION_METHOD_LIST_EDIT_ASYNC], watchEdit),
  takeLeading([Types.TRANSACTION_METHOD_LIST_ADD_ASYNC], watchAdd),
  takeLeading([Types.TRANSACTION_METHOD_LIST_SAVE_ASYNC], watchSave),
];
