import Selectors from './selectors';
import { Creators } from './insertion/duck';
import Sagas from './insertion/sagas';

export const entryListSagas = Sagas;

export default {
  selectors: Selectors,
  creators: Creators,
};
