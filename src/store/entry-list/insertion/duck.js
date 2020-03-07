import { createActions, createReducer, Types as defaulttypes } from 'reduxsauce';
import { identity } from 'lodash-es';

const initialState = {
  name: '',
  description: '',
  value: 0,
};

const clear = () => ({ ...initialState });

const setName = (state, { name }) => ({ ...state, name });

const setDescription = (state, { description }) => ({ ...state, description });

const setValue = (state, { value }) => ({ ...state, value });

export const { Types, Creators } = createActions({
  entryListInsertionClear: [],
  entryListInsertionSubmitAsync: ['name', 'description', 'value'],
  entryListInsertionSetName: ['name'],
  entryListInsertionSetDescription: ['description'],
  entryListInsertionSetValue: ['value'],
});

export default createReducer(initialState, {
  [defaulttypes.DEFAULT]: identity,
  [Types.ENTRY_LIST_INSERTION_CLEAR]: clear,
  [Types.ENTRY_LIST_INSERTION_SET_NAME]: setName,
  [Types.ENTRY_LIST_INSERTION_SET_DESCRIPTION]: setDescription,
  [Types.ENTRY_LIST_INSERTION_SET_VALUE]: setValue,
});
