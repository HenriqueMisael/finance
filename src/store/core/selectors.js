import { createSelector } from '../util';

const getState = (state) => state.core;

const getSpareIDs = createSelector([getState], (state) =>
  state.spareIDs.keySeq().toOrderedSet(),
);

const getNextID = createSelector([getSpareIDs], (spareIDs) => spareIDs.first());

const getEntryByEntryID = createSelector([getState], (state) => state.entry);

const getProfile = createSelector([getState], (state) => state.profile);

const getTheme = createSelector([getProfile], (profile) => profile.theme);

const getInitialBalance = createSelector(
  [getProfile],
  (profile) => profile.initialBalance,
);

const getName = createSelector([getProfile], (profile) => profile.name);

const getHasProfile = createSelector([getName], (name) => name !== '');

export default {
  getEntryByEntryID,
  getNextID,
  getProfile,
  getHasProfile,
  getName,
  getTheme,
  getInitialBalance,
};
