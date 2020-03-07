import Selectors from './selectors';
import { Creators } from './duck';
import Sagas from './sagas';

export const entryListSagas = Sagas;

export default {
  selectors: Selectors,
  creators: Creators,
};
