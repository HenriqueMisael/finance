import { createSelectorCreator, defaultMemoize } from 'reselect';

// eslint-disable-next-line import/prefer-default-export
export const createSelector = createSelectorCreator(defaultMemoize);
