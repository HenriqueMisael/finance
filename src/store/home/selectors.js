import { createSelector } from '../util';
import core from '../core';

const { getInitialBalance, getEntryByEntryID } = core.selectors;

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
