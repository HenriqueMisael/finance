import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import entryList from '../../store/entry-list';

import EntryValueInput from '../../components/entry-list/entry-modal/entry-value-input';

const { entryListEditingSetValue } = entryList.editing.creators;
const { getValue } = entryList.editing.selectors;

function EntryValueInputWired() {
  const value = useSelector(getValue);

  const dispatch = useDispatch();

  const handleValueChange = useCallback(
    (newValue) => {
      dispatch(entryListEditingSetValue(newValue));
    },
    [dispatch],
  );

  return <EntryValueInput onChange={handleValueChange} initialValue={value} />;
}

export default EntryValueInputWired;
