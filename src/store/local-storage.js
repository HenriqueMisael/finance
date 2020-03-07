import { Map } from 'immutable';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      // eslint-disable-next-line no-console
      console.log(`Nothing to load from storage`);
      return undefined;
    }
    const json = JSON.parse(serializedState);

    const entry = Map(json.entry);
    const spareIDs = Map(json.spareIDs);

    return {
      entry,
      spareIDs,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Error loading from storage: ${err}`);
    return undefined;
  }
};

/**
 * @param {CoreState} state
 */
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      entry: state.entry.toJS(),
      spareIDs: state.spareIDs.toJS(),
    });
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Error saving to storage: ${err}`);
  }
};
