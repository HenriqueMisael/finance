import Reducers, { Creators } from './duck';
import Selectors from './selectors';
import Sagas from './sagas';

export const insertionSagas = Sagas;
export const insertionReducers = Reducers;

export default {
  creators: Creators,
  selectors: Selectors,
};
