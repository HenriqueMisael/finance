import { Map } from 'immutable';
import { createActions, createReducer, Types as defaultypes } from 'reduxsauce';
import { identity } from 'lodash-es';
import { normalize } from './model/entry';

/**
 * @typedef {Object} CoreState
 * @property {Immutable.Map<string, EntryModel>} entry
 *
 * @type {Readonly<CoreState>}
 */
export const initialState = Object.freeze({
  entry: Map(),
});

const clear = () => ({ ...initialState });

const upsertEntry = (state, { entry }) => {
  const normalized = normalize(entry);
  const id = normalized.result;
  const added = Map([[id, normalized.entities.entry[id]]]);

  return {
    ...state,
    entry: state.entry.merge(added),
  };
};

const deleteEntry = (state, { entryID }) => ({
  ...state,
  entry: state.entry.remove(entryID),
});

export const { Types, Creators } = createActions({
  coreClear: [],
  coreUpsertEntry: ['entry'],
  coreDeleteEntry: ['entryID'],
});

export default createReducer(initialState, {
  [defaultypes.DEFAULT]: identity,
  [Types.CORE_CLEAR]: clear,
  [Types.CORE_UPSERT_ENTRY]: upsertEntry,
  [Types.CORE_DELETE_ENTRY]: deleteEntry,
});
