import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import entryList from '../../store/entry-list';

import EntryNameInput from '../../components/entry-list/entry-modal/entry-name-input';

const { entryListInsertionSetName } = entryList.insertion.creators;
const { getName } = entryList.insertion.selectors;

function EntryNameInputWired() {
  const name = useSelector(getName);

  const dispatch = useDispatch();

  const handleNameChange = useCallback(
    (value) => {
      dispatch(entryListInsertionSetName(value));
    },
    [dispatch],
  );

  return <EntryNameInput onChange={handleNameChange} initialValue={name} />;
}

export default EntryNameInputWired;
