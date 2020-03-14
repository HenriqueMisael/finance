import { createSelector } from '../util';

const getState = (state) => state.profile;

const getName = createSelector([getState], (state) => state.name);

const getInitialBalance = createSelector([getState], (state) => state.initialBalance);

const getTheme = createSelector([getState], (state) => state.theme);

const getHasProfile = createSelector([getName], (name) => name !== '');

export default {
  getName,
  getInitialBalance,
  getTheme,
  getHasProfile,
};
