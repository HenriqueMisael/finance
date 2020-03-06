import { createSelector } from '../util';

const getState = (state) => state.modal;

const getOpenedModals = createSelector([getState], (state) => state.opened);

export default {
  getOpenedModals,
};
