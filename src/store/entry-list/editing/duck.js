import { createActions, createReducer, Types as defaulttypes } from 'reduxsauce';
import { identity } from 'lodash-es';

const initialState = {
  id: '',
  name: '',
  description: '',
  transactionMethod: '',
  value: 0,
};

const clear = () => ({ ...initialState });

const setID = (state, { id }) => ({ ...state, id });

const setName = (state, { name }) => ({ ...state, name });

const setDescription = (state, { description }) => ({ ...state, description });

const setValue = (state, { value }) => ({ ...state, value });

const setTransactionMethod = (state, { transactionMethod }) => ({
  ...state,
  transactionMethod,
});

export const { Types, Creators } = createActions({
  entryListEditingClear: [],
  entryListEditingSetID: ['id'],
  entryListEditingSetName: ['name'],
  entryListEditingSetDescription: ['description'],
  entryListEditingSetValue: ['value'],
  entryListEditingSetTransactionMethod: ['transactionMethod'],

  entryListEditingSubmitAsync: ['name', 'description', 'value'],
});

export default createReducer(initialState, {
  [defaulttypes.DEFAULT]: identity,
  [Types.ENTRY_LIST_EDITING_CLEAR]: clear,
  [Types.ENTRY_LIST_EDITING_SET_ID]: setID,
  [Types.ENTRY_LIST_EDITING_SET_NAME]: setName,
  [Types.ENTRY_LIST_EDITING_SET_DESCRIPTION]: setDescription,
  [Types.ENTRY_LIST_EDITING_SET_VALUE]: setValue,
  [Types.ENTRY_LIST_EDITING_SET_TRANSACTION_METHOD]: setTransactionMethod,
});
