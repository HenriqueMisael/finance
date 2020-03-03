import { createSelector } from '../util';
import core from '../core';

const getEntryIDs = createSelector([core.selectors.getEntryByEntryID], (entryByEntryID) =>
  entryByEntryID.keySeq().toOrderedSet(),
);

export default {
  getEntryIDs,
};
