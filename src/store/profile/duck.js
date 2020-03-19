import { createActions, createReducer, Types as defaulttypes } from 'reduxsauce';
import { identity } from 'lodash-es';

/**
 * @typedef {{initialBalance: string, name: string, theme: string}} ProfileState
 *
 * @type ProfileState
 */
const initialState = {
  name: '',
  initialBalance: '',
  theme: '',
};

const clear = () => ({ ...initialState });

const setName = (state, { name }) => ({ ...state, name });

const setInitialBalance = (state, { initialBalance }) => ({ ...state, initialBalance });

const setTheme = (state, { theme }) => ({ ...state, theme });

export const { Types, Creators } = createActions({
  profileClear: [],
  profileSetName: ['name'],
  profileSetInitialBalance: ['initialBalance'],
  profileSetTheme: ['theme'],

  profileSaveAsync: ['name', 'balance'],
});

export default createReducer(initialState, {
  [defaulttypes.DEFAULT]: identity,
  [Types.PROFILE_CLEAR]: clear,
  [Types.PROFILE_SET_NAME]: setName,
  [Types.PROFILE_SET_INITIAL_BALANCE]: setInitialBalance,
  [Types.PROFILE_SET_THEME]: setTheme,
});
