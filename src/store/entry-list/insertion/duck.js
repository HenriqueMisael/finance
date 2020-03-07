import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  entryListInsertionSubmitAsync: ['name', 'description', 'value'],
});
