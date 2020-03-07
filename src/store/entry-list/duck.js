import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  entryListAddAsync: ['name', 'description', 'value'],
});
