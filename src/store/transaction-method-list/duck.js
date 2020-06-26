import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  transactionMethodListDeleteAsync: ['transactionMethodID'],
  transactionMethodListEditAsync: ['transactionMethodID'],
  transactionMethodListAddAsync: [],
  transactionMethodListSaveAsync: [],
});
