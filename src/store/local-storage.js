import { Map } from 'immutable';

import Entry from './core/model/entry';
import Profile from './core/model/profile';
import TransactionMethod from './core/model/transaction-method';

function parseCore(json) {
  if (!json) return null;

  const entry = Map(json.entry).map(({ description, id, title, value }) =>
    Entry(id, title, description, value),
  );
  const transactionMethod = Map(json.transactionMethod).map(({ description, id }) =>
    TransactionMethod(id, description),
  );
  const spareIDs = Map(json.spareIDs);
  const { name, initialBalance, theme } = json.profile;

  return {
    entry,
    transactionMethod,
    spareIDs,
    profile: Profile(name, initialBalance, theme),
  };
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      // eslint-disable-next-line no-console
      console.log(`Nothing to load from storage`);
      return {};
    }
    const json = JSON.parse(serializedState);

    return {
      core: parseCore(json.core),
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Error loading from storage: ${err}`);
    return undefined;
  }
};

/**
 * @param {{core: CoreState}} state
 */
export const saveState = (state) => {
  try {
    const buffer = {
      core: {
        entry: state.core.entry.toJS(),
        transactionMethod: state.core.transactionMethod.toJS(),
        spareIDs: state.core.spareIDs.toJS(),
        profile: state.core.profile,
      },
    };

    const serializedState = JSON.stringify(buffer);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Error saving to storage: ${err}`);
  }
};
