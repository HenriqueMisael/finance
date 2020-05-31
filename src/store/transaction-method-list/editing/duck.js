import { createActions, createReducer, Types as defaulttypes } from 'reduxsauce';
import { identity } from 'lodash-es';

const initialState = {
  id: '',
  description: '',
};

const clear = () => ({ ...initialState });

const setID = (state, { id }) => ({ ...state, id });

const setDescription = (state, { description }) => ({ ...state, description });

export const { Types, Creators } = createActions({
  transactionMethodListEditingClear: [],
  transactionMethodListEditingSetID: ['id'],
  transactionMethodListEditingSetDescription: ['description'],

  transactionMethodListEditingSubmitAsync: ['description'],
});

export default createReducer(initialState, {
  [defaulttypes.DEFAULT]: identity,
  [Types.TRANSACTION_METHOD_LIST_EDITING_CLEAR]: clear,
  [Types.TRANSACTION_METHOD_LIST_EDITING_SET_ID]: setID,
  [Types.TRANSACTION_METHOD_LIST_EDITING_SET_DESCRIPTION]: setDescription,
});
