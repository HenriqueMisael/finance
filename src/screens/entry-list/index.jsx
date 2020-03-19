import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import styled from 'styled-components';

import entryList from '../../store/entry-list';
import modal from '../../store/modal';
import ListItemButton from '../../components/buttons/list-item';

import EntryList from '../../components/entry-list';
import EntryCardWired from './entry-card-wired';
import AppTitle from '../../components/app-title';

const { getEntryIDs } = entryList.selectors;

const ButtonContainer = styled.div`
  padding: 0.5rem 0;
`;

function EntryListScreen() {
  const entryIDs = useSelector(getEntryIDs);

  const dispatch = useDispatch();

  const handleAdd = useCallback(() => {
    dispatch(modal.creators.modalOpen('EntryModal'));
  }, [dispatch]);

  return (
    <EntryList>
      <AppTitle screen="entryList" />
      {entryIDs.map((entryID) => (
        <EntryCardWired key={entryID} entryID={entryID} />
      ))}
      <ButtonContainer>
        <ListItemButton onClick={handleAdd}>
          <MdAdd />
        </ListItemButton>
      </ButtonContainer>
    </EntryList>
  );
}

export default EntryListScreen;
