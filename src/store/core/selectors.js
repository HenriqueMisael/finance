import {createSelector} from '../util';

const getState = (state) => state.core;

const getNextID = createSelector([getState], state => state.spareIDs.get(0));

const getEntryByEntryID = createSelector([getState], (state) => state.entry);

export default {
  getEntryByEntryID,
  getNextID
};
