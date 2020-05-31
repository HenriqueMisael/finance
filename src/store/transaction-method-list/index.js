import { combineReducers } from 'redux';

import { Creators } from './duck';
import selectors from './selectors';
import Sagas from './sagas';
import editing, { editingSagas, editingReducers } from './editing';

export const transactionMethodListSagas = [...editingSagas, ...Sagas];

export default {
  selectors,
  creators: Creators,
  editing,
  reducers: combineReducers({
    editing: editingReducers,
  }),
};
