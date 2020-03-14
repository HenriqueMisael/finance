import { createSelector } from '../util';

const getState = (state) => state.core;

const getSpareIDs = createSelector([getState], (state) =>
  state.spareIDs.keySeq().toOrderedSet(),
);

const getNextID = createSelector([getSpareIDs], (spareIDs) => spareIDs.first());

const getEntryByEntryID = createSelector([getState], (state) => state.entry);

export default {
  getEntryByEntryID,
  getNextID,
};
