import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import entryList from '../../store/entry-list';

import EntryDescriptionInput from '../../components/entry-list/entry-modal/entry-description-input';

const { entryListEditingSetDescription } = entryList.editing.creators;
const { getDescription } = entryList.editing.selectors;

function EntryDescriptionInputWired() {
  const description = useSelector(getDescription);

  const dispatch = useDispatch();

  const handleDescriptionChange = useCallback(
    (value) => {
      dispatch(entryListEditingSetDescription(value));
    },
    [dispatch],
  );

  return (
    <EntryDescriptionInput
      onChange={handleDescriptionChange}
      initialValue={description}
    />
  );
}

export default EntryDescriptionInputWired;
