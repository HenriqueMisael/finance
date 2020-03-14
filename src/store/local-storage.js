import { Map } from 'immutable';

function parseCore(json) {
  if (!json) return null;

  const entry = Map(json.entry);
  const spareIDs = Map(json.spareIDs);

  return {
    entry,
    spareIDs,
  };
}

function parseProfile(json) {
  if (!json) return null;

  const { name, initialBalance, theme } = json;

  return { name, initialBalance, theme };
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
      profile: parseProfile(json.profile),
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Error loading from storage: ${err}`);
    return undefined;
  }
};

/**
 * @param {{core: CoreState, profile: ProfileState}} state
 */
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      core: {
        entry: state.core.entry.toJS(),
        spareIDs: state.core.spareIDs.toJS(),
      },
      profile: state.profile,
    });
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Error saving to storage: ${err}`);
  }
};
