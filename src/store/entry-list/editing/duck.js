import { createActions, createReducer, Types as defaulttypes } from 'reduxsauce';
import { identity } from 'lodash-es';

const initialState = {
  id: '',
  name: '',
  description: '',
  value: 0,
};

const clear = () => ({ ...initialState });

const setID = (state, { id }) => ({ ...state, id });

const setName = (state, { name }) => ({ ...state, name });

const setDescription = (state, { description }) => ({ ...state, description });

const setValue = (state, { value }) => ({ ...state, value });

export const { Types, Creators } = createActions({
  entryListEditingClear: [],
  entryListEditingSetID: ['id'],
  entryListEditingSetName: ['name'],
  entryListEditingSetDescription: ['description'],
  entryListEditingSetValue: ['value'],

  entryListEditingSubmitAsync: ['name', 'description', 'value'],
});

export default createReducer(initialState, {
  [defaulttypes.DEFAULT]: identity,
  [Types.ENTRY_LIST_EDITING_CLEAR]: clear,
  [Types.ENTRY_LIST_EDITING_SET_ID]: setID,
  [Types.ENTRY_LIST_EDITING_SET_NAME]: setName,
  [Types.ENTRY_LIST_EDITING_SET_DESCRIPTION]: setDescription,
  [Types.ENTRY_LIST_EDITING_SET_VALUE]: setValue,
});
