import {createSelector} from '../util';

const getState = (state) => state.core;

const getEntryByEntryID = createSelector([getState], (state) => state.entry);

export default {
  getEntryByEntryID,
};
