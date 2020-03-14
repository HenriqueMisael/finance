import { createSelector } from '../../util';

const getState = (state) => state.entryList.insertion;

const getID = createSelector([getState], (state) => state.id);

const getIsInsertion = createSelector([getID], (id) => id === '');

const getName = createSelector([getState], (state) => state.name);

const getDescription = createSelector([getState], (state) => state.description);

const getValue = createSelector([getState], (state) => state.value);

export default {
  getIsInsertion,
  getID,
  getName,
  getDescription,
  getValue,
};
