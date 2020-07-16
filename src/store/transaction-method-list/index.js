import { combineReducers } from 'redux';

import { Creators } from './duck';
import selectors from './selectors';
import Sagas from './sagas';
import editing, { editingReducers } from './editing';
import search, { searchReducers } from './search';

export const transactionMethodListSagas = [...Sagas];

export default {
  selectors,
  creators: Creators,
  editing,
  search,
  reducers: combineReducers({
    editing: editingReducers,
    search: searchReducers,
  }),
};
