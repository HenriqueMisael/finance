import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdd } from 'react-icons/md';

import entryList from '../../store/entry-list';
import modal from '../../store/modal';

import EntryList from './components';
import EntryCardWired from './entry-card-wired';
import ListItemButton from '../../components/buttons/list-item';

const { getEntryIDs } = entryList.selectors;

function EntryListScreen() {
  const entryIDs = useSelector(getEntryIDs);

  const dispatch = useDispatch();

  const handleAdd = useCallback(() => {
    dispatch(modal.creators.modalOpen('AddEntryModalWired'));
  }, [dispatch]);

  return (
    <EntryList>
      {entryIDs.map((entryID) => (
        <EntryCardWired entryID={entryID} />
      ))}
      <ListItemButton onClick={handleAdd}>
        <MdAdd />
      </ListItemButton>
    </EntryList>
  );
}

export default EntryListScreen;
