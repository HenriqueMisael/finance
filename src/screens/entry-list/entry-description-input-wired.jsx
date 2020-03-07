import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import entryList from '../../store/entry-list';

import EntryDescriptionInput from './components/entry-description-input';

const { entryListInsertionSetDescription } = entryList.insertion.creators;
const { getDescription } = entryList.insertion.selectors;

function EntryDescriptionInputWired() {
  const description = useSelector(getDescription);

  const dispatch = useDispatch();

  const handleDescriptionChange = useCallback(
    (value) => {
      dispatch(entryListInsertionSetDescription(value));
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
