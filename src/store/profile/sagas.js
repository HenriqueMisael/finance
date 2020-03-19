import { put, takeLeading } from 'redux-saga/effects';

import core from '../core';
import Profile from '../core/model/profile';

import { Types } from './duck';

function* watchSave({ name, balance }) {
  yield put(core.creators.coreSetProfile(Profile(name, balance)));
}

export default [takeLeading([Types.PROFILE_SAVE_ASYNC], watchSave)];
