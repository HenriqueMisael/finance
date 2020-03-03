import React from 'react';
import { useSelector } from 'react-redux';

import entryList from '../../store/entry-list';

import EntryList from '../../components/entry-list';

import EntryCardWired from './entry-card-wired';

const { getEntryIDs } = entryList.selectors;

function EntryListScreen() {
  const entryIDs = useSelector(getEntryIDs);

  return (
    <EntryList>
      {entryIDs.map((entryID) => (
        <EntryCardWired entryID={entryID} />
      ))}
    </EntryList>
  );
}

export default EntryListScreen;
