import { createSelector } from '../../util';

const getState = (state) => state.entryList.editing;

const getID = createSelector([getState], (state) => state.id);

const getIsEditing = createSelector([getID], (id) => id === '');

const getName = createSelector([getState], (state) => state.name);

const getDescription = createSelector([getState], (state) => state.description);

const getValue = createSelector([getState], (state) => state.value);

const getTransactionMethod = createSelector(
  [getState],
  (state) => state.transactionMethod,
);

export default {
  getIsEditing,
  getID,
  getName,
  getDescription,
  getValue,
  getTransactionMethod,
};
