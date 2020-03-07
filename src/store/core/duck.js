import { Map } from 'immutable';
import { createActions, createReducer, Types as defaultypes } from 'reduxsauce';
import { identity } from 'lodash-es';

import { normalize } from './model/entry';

const Strategy = {
  SEQUENTIAL: (current) => (Number.parseInt(current, 10) + 1).toString(),
};

/**
 * @typedef {Object} CoreState
 * @property {Immutable.Map<string, EntryModel>} entry
 * @property {Map<string, string>} spareIDs
 */

/**
 * @type {CoreState}
 */
export const initialState = {
  entry: Map(),
  spareIDs: Map([['1', 'SEQUENTIAL']]),
};

const clear = () => ({ ...initialState });

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
  spareIDs: state.spareIDs.add(entryID),
});

export const { Types, Creators } = createActions({
  coreClear: [],
  coreRegisterId: ['id'],
  coreUpsertEntry: ['entry'],
  coreDeleteEntry: ['entryID'],
});

export default createReducer(initialState, {
  [defaultypes.DEFAULT]: identity,
  [Types.CORE_CLEAR]: clear,
  [Types.CORE_REGISTER_ID]: registerID,
  [Types.CORE_UPSERT_ENTRY]: upsertEntry,
  [Types.CORE_DELETE_ENTRY]: deleteEntry,
});
