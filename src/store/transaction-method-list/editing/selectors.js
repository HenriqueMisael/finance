import { createSelector } from '../../util';

const getState = (state) => state.transactionMethodList.editing;

const getID = createSelector([getState], (state) => state.id);

const getIsAdding = createSelector([getState], (state) => state.new);

const getDescription = createSelector([getState], (state) => state.description);

export default {
  getIsAdding,
  getID,
  getDescription,
};
