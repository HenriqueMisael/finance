import { createActions, createReducer, Types as defaulttypes } from 'reduxsauce';
import { identity } from 'lodash-es';

const initialState = {
  query: '',
};

const clear = () => ({ ...initialState });

const setQuery = (state, { query }) => ({ ...state, query });

export const { Types, Creators } = createActions({
  transactionMethodListSearchClear: [],
  transactionMethodListSearchSetQuery: ['query'],
});

export default createReducer(initialState, {
  [defaulttypes.DEFAULT]: identity,
  [Types.TRANSACTION_METHOD_LIST_SEARCH_CLEAR]: clear,
  [Types.TRANSACTION_METHOD_LIST_SEARCH_SET_QUERY]: setQuery,
});
