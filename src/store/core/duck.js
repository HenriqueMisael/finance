import { createActions, createReducer, Types as defaultypes } from 'reduxsauce';
import { identity } from 'lodash-es';

const initialState = Object.freeze({
  username: '',
});

const clear = () => ({ ...initialState });

export const { Types, Creators } = createActions({
  coreClear: [],
});

export default createReducer(initialState, {
  [defaultypes.DEFAULT]: identity,
  [Types.CORE_CLEAR]: clear,
});
