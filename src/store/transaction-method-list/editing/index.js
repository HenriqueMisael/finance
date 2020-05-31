import Reducers, { Creators } from './duck';
import Selectors from './selectors';
import Sagas from './sagas';

export const editingSagas = Sagas;
export const editingReducers = Reducers;

export default {
  creators: Creators,
  selectors: Selectors,
};
