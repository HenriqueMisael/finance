import { createSelector } from '../../util';

const getState = (state) => state.entryList.insertion;

const getName = createSelector([getState], (state) => state.name);

const getDescription = createSelector([getState], (state) => state.description);

const getValue = createSelector([getState], (state) => state.value);

export default {
  getName,
  getDescription,
  getValue,
};
