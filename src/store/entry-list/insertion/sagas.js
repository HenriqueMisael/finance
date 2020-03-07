import { all, put, takeLeading, select } from 'redux-saga/effects';

import core from '../../core';

import { Types } from './duck';
import Entry from '../../core/model/entry';

const { getNextID } = core.selectors;

/**
 * @param {string} name
 * @param {string} description
 * @param {number} value
 */
function* watchSubmit({ name, description, value }) {
  const id = yield select(getNextID);
  const entry = Entry(id, name, description, value);
  yield all([
    put(core.creators.coreUpsertEntry(entry)),
    put(core.creators.coreRegisterId(id)),
  ]);
}

export default [takeLeading([Types.ENTRY_LIST_INSERTION_SUBMIT_ASYNC], watchSubmit)];
