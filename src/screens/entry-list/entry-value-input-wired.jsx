import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import entryList from '../../store/entry-list';

import EntryValueInput from './components/entry-value-input';

const { entryListInsertionSetValue } = entryList.insertion.creators;
const { getValue } = entryList.insertion.selectors;

function EntryValueInputWired() {
  const value = useSelector(getValue);

  const dispatch = useDispatch();

  const handleValueChange = useCallback(
    (newValue) => {
      dispatch(entryListInsertionSetValue(newValue));
    },
    [dispatch],
  );

  return <EntryValueInput onChange={handleValueChange} initialValue={value} />;
}

export default EntryValueInputWired;
