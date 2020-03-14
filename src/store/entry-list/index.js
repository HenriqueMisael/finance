import { combineReducers } from 'redux';

import { Creators } from './duck';
import selectors from './selectors';
import Sagas from './sagas';
import insertion, { insertionSagas, insertionReducers } from './insertion';

export const entryListSagas = [...insertionSagas, ...Sagas];

export default {
  selectors,
  creators: Creators,
  insertion,
  reducers: combineReducers({
    insertion: insertionReducers,
  }),
};
