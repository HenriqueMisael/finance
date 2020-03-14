import { all, put, takeLeading } from 'redux-saga/effects';

import { Creators, Types } from './duck';

function* watchSave({ name, balance }) {
  yield all([
    put(Creators.profileSetName(name)),
    put(Creators.profileSetInitialBalance(balance)),
  ]);
}

export default [takeLeading([Types.PROFILE_SAVE_ASYNC], watchSave)];
