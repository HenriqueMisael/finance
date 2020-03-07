import { createSelector } from '../util';
import core from '../core';

const getEntryIDs = createSelector(
  [core.selectors.getEntryByEntryID],
  (entryByEntryID) => {
    return entryByEntryID.keySeq().toOrderedSet();
  },
);

export default {
  getEntryIDs,
};
