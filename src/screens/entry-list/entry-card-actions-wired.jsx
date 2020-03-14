import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { MdDelete, MdModeEdit } from 'react-icons/md';

import EntryCardActions from '../../components/entry-list/entry-card/entry-card-actions';
import IconButton from '../../components/buttons/icon';
import entryList from '../../store/entry-list';
import modal from '../../store/modal';

const { entryListDeleteAsync, entryListEditAsync } = entryList.creators;

function EntryCardActionsWired({ entryID }) {
  const dispatch = useDispatch();

  const handleDelete = useCallback(() => {
    dispatch(entryListDeleteAsync(entryID));
  }, [dispatch, entryID]);
  const handleEdit = useCallback(() => {
    dispatch(entryListEditAsync(entryID));
    dispatch(modal.creators.modalOpen('AddEntryModal'));
  }, [dispatch, entryID]);

  return (
    <EntryCardActions>
      <EntryCardActions>
        <IconButton onClick={handleDelete}>
          <MdDelete />
        </IconButton>
        <IconButton onClick={handleEdit}>
          <MdModeEdit />
        </IconButton>
      </EntryCardActions>
    </EntryCardActions>
  );
}

EntryCardActionsWired.propTypes = { entryID: PropTypes.string.isRequired };

export default EntryCardActionsWired;
