import { all, put, select, takeLeading } from 'redux-saga/effects';

import core from '../../core';
import Entry from '../../core/model/entry';

import Selectors from './selectors';
import { Types } from './duck';

const { getNextID } = core.selectors;
const { getIsEditing, getID, getName, getDescription, getValue } = Selectors;

function* watchSubmit() {
  const isEditing = yield select(getIsEditing);

  const [id, name, description, value] = [
    yield select(isEditing ? getNextID : getID),
    yield select(getName),
    yield select(getDescription),
    yield select(getValue),
  ];
  const entry = Entry(id, name, description, value);
  yield all([
    put(core.creators.coreUpsertEntry(entry)),
    put(core.creators.coreRegisterId(id)),
  ]);
}

export default [takeLeading([Types.ENTRY_LIST_EDITING_SUBMIT_ASYNC], watchSubmit)];
