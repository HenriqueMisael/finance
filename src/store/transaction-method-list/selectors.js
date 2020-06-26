import { createSelector } from '../util';
import core from '../core';

import editing from './editing';

const getTransactionMethodIDs = createSelector(
  [core.selectors.getTransactionMethodByTransactionMethodID],
  (transactionMethodByTransactionMethodID) => {
    return transactionMethodByTransactionMethodID.keySeq().toOrderedSet();
  },
);

const getDescriptionByTransactionMethodID = createSelector(
  [core.selectors.getTransactionMethodByTransactionMethodID],
  (transactionMethodByTransactionMethodID) =>
    transactionMethodByTransactionMethodID.map(
      (transactionMethod) => transactionMethod.description,
    ),
);

const getIsSelectedByTransactionMethodID = createSelector(
  [getTransactionMethodIDs, editing.selectors.getID],
  (transactionMethodIDs, selectedTransactionMethod) =>
    transactionMethodIDs
      .toKeyedSeq()
      .map((transactionMethodID) => transactionMethodID === selectedTransactionMethod)
      .toMap(),
);

export default {
  getTransactionMethodIDs,
  getDescriptionByTransactionMethodID,
  getIsSelectedByTransactionMethodID,
};
