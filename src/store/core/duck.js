import { Map, Set } from 'immutable';
import { createActions, createReducer, Types as defaultypes } from 'reduxsauce';
import { identity } from 'lodash-es';

import { normalize } from './model/entry';

/**
 * @typedef {Object} CoreState
 * @property {Immutable.Map<string, EntryModel>} entry
 * @property {Immutable.Set<string>} spareIDs
 *
 * @type {CoreState}
 */
export const initialState = Object.freeze({
  entry: Map(),
  spareIDs: Set(['1']),
});

/**
 * @returns {CoreState}
 */
const clear = () => ({ ...initialState });

const consumeSpareID = (state, { id }) => ({
  ...state,
  spareIDs: state.spareIDs.remove(id),
});

/**
 * @param {CoreState} state
 * @param {{entry: EntryModel}} action
 * @returns {CoreState}
 */
const upsertEntry = (state, { entry }) => {
  const normalized = normalize(entry);
  console.log({normalized});
  const id = normalized.result;
  const added = Map([[id, normalized.entities.entry[id]]]);

  return {
    ...state,
    entry: state.entry.merge(added),
  };
};

/**
 * @param {CoreState} state
 * @param {{entryID: string}} action
 * @returns {CoreState}
 */
const deleteEntry = (state, { entryID }) => ({
  ...state,
  entry: state.entry.remove(entryID),
  spareIDs: state.spareIDs.add(entryID),
});

export const { Types, Creators } = createActions({
  coreClear: [],
  coreConsumeSpareID: ['id'],
  coreUpsertEntry: ['entry'],
  coreDeleteEntry: ['entryID'],
});

export default createReducer(initialState, {
  [defaultypes.DEFAULT]: identity,
  [Types.CORE_CLEAR]: clear,
  [Types.CORE_CONSUME_SPARE_ID]: consumeSpareID,
  [Types.CORE_UPSERT_ENTRY]: upsertEntry,
  [Types.CORE_DELETE_ENTRY]: deleteEntry,
});
