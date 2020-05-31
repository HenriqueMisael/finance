import { Map } from 'immutable';
import { createActions, createReducer, Types as defaultypes } from 'reduxsauce';
import { identity } from 'lodash-es';

import { normalize as normalizeEntry } from './model/entry';
import { normalize as normalizeTransactionMethod } from './model/transaction-method';
import Profile from './model/profile';

const Strategy = {
  SEQUENTIAL: (current) => (Number.parseInt(current, 10) + 1).toString(),
};

/**
 * @typedef {Object} CoreState
 * @property {Immutable.Map<string, EntryModel>} entry
 * @property {Immutable.Map<string, TransactionMethodModel>} transactionMethod
 * @property {Map<string, string>} spareIDs
 * @property {ProfileModel} profile
 */

/**
 * @type {CoreState}
 */
export const initialState = {
  entry: Map(),
  transactionMethod: Map(),
  spareIDs: Map([['1', 'SEQUENTIAL']]),
  profile: Profile(),
};

/**
 * @returns {CoreState}
 */
const clear = () => ({ ...initialState });

/**
 * @param {CoreState} state
 * @param {string} id
 * @returns {CoreState}
 */
const registerID = (state, { id }) => {
  const generatorStrategy = state.spareIDs.get(id);
  let spareIDs = state.spareIDs.filterNot((_, spareID) => spareID === id);

  if (generatorStrategy) {
    const newID = Strategy[generatorStrategy](id);
    spareIDs = spareIDs.set(newID, generatorStrategy);
  }

  return {
    ...state,
    spareIDs,
  };
};

/**
 * @param {CoreState} state
 * @param {EntryModel} entry
 * @returns {CoreState}
 */
const upsertEntry = (state, { entry }) => {
  const normalized = normalizeEntry(entry);
  const id = normalized.result;
  const added = Map([[id, normalized.entities.entry[id]]]);

  return {
    ...state,
    entry: state.entry.merge(added),
  };
};

/**
 * @param {CoreState} state
 * @param {string} entryID
 * @returns {CoreState}
 */
const deleteEntry = (state, { entryID }) => ({
  ...state,
  entry: state.entry.remove(entryID),
  spareIDs: state.spareIDs.set(entryID, null),
});

/**
 * @param {CoreState} state
 * @param {TransactionMethodModel} entry
 * @returns {CoreState}
 */
const upsertTransactionMethod = (state, { transactionMethod }) => {
  const normalized = normalizeTransactionMethod(transactionMethod);
  const id = normalized.result;
  const added = Map([[id, normalized.entities.transactionMethod[id]]]);

  return {
    ...state,
    transactionMethod: state.transactionMethod.merge(added),
  };
};

/**
 * @param {CoreState} state
 * @param {string} transactionMethodID
 * @returns {CoreState}
 */
const deleteTransactionMethod = (state, { transactionMethodID }) => ({
  ...state,
  transactionMethod: state.transactionMethod.remove(transactionMethodID),
  spareIDs: state.spareIDs.set(transactionMethodID, null),
});

/**
 * @param {CoreState} state
 * @param {ProfileModel} profile
 * @returns {CoreState}
 */
const setProfile = (state, { profile }) => ({
  ...state,
  profile,
});

/**
 * @param {CoreState} state
 * @param {string} theme
 * @returns {CoreState}
 */
const setProfileTheme = (state, { theme }) => ({
  ...state,
  profile: { ...state.profile, theme },
});

export const { Types, Creators } = createActions({
  coreClear: [],
  coreRegisterId: ['id'],

  coreUpsertEntry: ['entry'],
  coreDeleteEntry: ['entryID'],

  coreUpsertTransactionMethod: ['transactionMethod'],
  coreDeleteTransactionMethod: ['transactionMethodID'],

  coreSetProfile: ['profile'],
  coreSetProfileTheme: ['theme'],
});

export default createReducer(initialState, {
  [defaultypes.DEFAULT]: identity,
  [Types.CORE_CLEAR]: clear,
  [Types.CORE_REGISTER_ID]: registerID,
  [Types.CORE_UPSERT_ENTRY]: upsertEntry,
  [Types.CORE_DELETE_ENTRY]: deleteEntry,
  [Types.CORE_UPSERT_TRANSACTION_METHOD]: upsertTransactionMethod,
  [Types.CORE_DELETE_TRANSACTION_METHOD]: deleteTransactionMethod,
  [Types.CORE_SET_PROFILE]: setProfile,
  [Types.CORE_SET_PROFILE_THEME]: setProfileTheme,
});
