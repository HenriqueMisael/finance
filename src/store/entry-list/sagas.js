import { put, takeLeading } from 'redux-saga/effects';

import core from '../core';

import { Types } from './duck';

function* watchDelete({ entryID }) {
  yield put(core.creators.coreDeleteEntry(entryID));
}

export default [takeLeading([Types.ENTRY_LIST_DELETE_ASYNC], watchDelete)];
