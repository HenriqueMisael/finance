import { all, put, select, takeLeading } from 'redux-saga/effects';

import core from '../core';

import { Types } from './duck';
import insertion from './insertion';

const { getEntryByEntryID } = core.selectors;

const {
  entryListInsertionSetID,
  entryListInsertionSetName,
  entryListInsertionSetDescription,
  entryListInsertionSetValue,
} = insertion.creators;

function* watchDelete({ entryID }) {
  yield put(core.creators.coreDeleteEntry(entryID));
}

function* watchEdit({ entryID }) {
  const entryByEntryID = yield select(getEntryByEntryID);
  const { title, description, value } = entryByEntryID.get(entryID);

  yield all([
    put(entryListInsertionSetID(entryID)),
    put(entryListInsertionSetName(title)),
    put(entryListInsertionSetDescription(description)),
    put(entryListInsertionSetValue(value)),
  ]);
}

export default [
  takeLeading([Types.ENTRY_LIST_DELETE_ASYNC], watchDelete),
  takeLeading([Types.ENTRY_LIST_EDIT_ASYNC], watchEdit),
];
