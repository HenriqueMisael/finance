import { createSelector } from '../util';
import core from '../core';

const getTransactionMethodIDs = createSelector(
  [core.selectors.getTransactionMethodByTransactionMethodID],
  (transactionMethodByTransactionMethodID) => {
    return transactionMethodByTransactionMethodID.keySeq().toOrderedSet();
  },
);

export default {
  getTransactionMethodIDs,
};
