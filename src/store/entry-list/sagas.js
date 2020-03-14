import { all, put, select, takeLeading } from 'redux-saga/effects';

import core from '../core';

import { Types } from './duck';
import editing from './editing';

const { getEntryByEntryID } = core.selectors;

const {
  entryListEditingSetID,
  entryListEditingSetName,
  entryListEditingSetDescription,
  entryListEditingSetValue,
} = editing.creators;

function* watchDelete({ entryID }) {
  yield put(core.creators.coreDeleteEntry(entryID));
}

function* watchEdit({ entryID }) {
  const entryByEntryID = yield select(getEntryByEntryID);
  const { title, description, value } = entryByEntryID.get(entryID);

  yield all([
    put(entryListEditingSetID(entryID)),
    put(entryListEditingSetName(title)),
    put(entryListEditingSetDescription(description)),
    put(entryListEditingSetValue(value)),
  ]);
}

export default [
  takeLeading([Types.ENTRY_LIST_DELETE_ASYNC], watchDelete),
  takeLeading([Types.ENTRY_LIST_EDIT_ASYNC], watchEdit),
];
