import {put, takeLeading, select} from 'redux-saga/effects';

import core from '../core';

import { Types } from './duck';
import Entry from '../core/model/entry';

const {getNextID} = core.selectors;

/**
 * @param {string} name
 * @param {string} description
 * @param {number} value
 */
function* watchAdd({ name, description, value }) {
  const id = yield select(getNextID);
  const entry = Entry(id, name, description, value);
  console.log({entry});
  yield put(core.creators.coreUpsertEntry(entry));
}

export default [takeLeading([Types.ENTRY_LIST_ADD_ASYNC], watchAdd)];
