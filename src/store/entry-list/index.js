import { combineReducers } from 'redux';

import selectors from './selectors';
import insertion, { insertionSagas, insertionReducers } from './insertion';

export const entryListSagas = [...insertionSagas];

export default {
  selectors,
  insertion,
  reducers: combineReducers({
    insertion: insertionReducers,
  }),
};
