import { all, put, takeLeading, select } from 'redux-saga/effects';

import core from '../../core';
import Entry from '../../core/model/entry';

import Selectors from './selectors';
import { Creators, Types } from './duck';

const { getNextID } = core.selectors;
const { getName, getDescription, getValue } = Selectors;

function* watchSubmit() {
  const [id, name, description, value] = [
    yield select(getNextID),
    yield select(getName),
    yield select(getDescription),
    yield select(getValue),
  ];
  const entry = Entry(id, name, description, value);
  yield all([
    put(core.creators.coreUpsertEntry(entry)),
    put(core.creators.coreRegisterId(id)),
    put(Creators.entryListInsertionClear()),
  ]);
}

export default [takeLeading([Types.ENTRY_LIST_INSERTION_SUBMIT_ASYNC], watchSubmit)];
