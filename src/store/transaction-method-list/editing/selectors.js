import { createSelector } from '../../util';

const getState = (state) => state.transactionMethod.editing;

const getID = createSelector([getState], (state) => state.id);

const getIsEditing = createSelector([getID], (id) => id === '');

const getDescription = createSelector([getState], (state) => state.description);

export default {
  getIsEditing,
  getID,
  getDescription,
};
