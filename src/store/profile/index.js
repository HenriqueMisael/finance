import Reducers, { Creators } from './duck';
import Selectors from './selectors';
import Sagas from './sagas';

export const profileSagas = Sagas;

export default {
  creators: Creators,
  selectors: Selectors,
  reducers: Reducers,
};
