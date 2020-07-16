import { createSelector } from '../../util';

const getState = (state) => state.transactionMethodList.search;

const getQuery = createSelector([getState], (state) => state.query);

export default {
  getQuery,
};
