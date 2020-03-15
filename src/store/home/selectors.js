import { createSelector } from '../util';
import profile from '../profile';
import core from '../core';

const { getEntryByEntryID } = core.selectors;
const { getInitialBalance } = profile.selectors;

const getBalance = createSelector(
  [getInitialBalance, getEntryByEntryID],
  (initialBalance, entryByEntryID) =>
    entryByEntryID
      .toSeq()
      .map((entry) => entry.value)
      .reduce((acc, value) => acc + value, initialBalance),
);

export default {
  getBalance,
};
