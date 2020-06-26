import { combineReducers } from 'redux';

import { Creators } from './duck';
import selectors from './selectors';
import Sagas from './sagas';
import editing, { editingReducers } from './editing';

export const transactionMethodListSagas = [...Sagas];

export default {
  selectors,
  creators: Creators,
  editing,
  reducers: combineReducers({
    editing: editingReducers,
  }),
};
