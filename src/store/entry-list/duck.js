import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  entryListDeleteAsync: ['entryID'],
  entryListEditAsync: ['entryID'],
});
