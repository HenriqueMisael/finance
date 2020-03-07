import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import entryList from '../../store/entry-list';

import EntryNameInput from './components/entry-name-input';
import EntryDescriptionInput from './components/entry-description-input';
import EntryValueInput from './components/entry-value-input';
import modal from '../../store/modal';
import AddEntryModal from './components/add-entry-modal';

function AddEntryModalWired({ visible }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [totalValue, setTotalValue] = useState(0);

  const handleNameChange = useCallback(
    (value) => {
      setName(value);
    },
    [setName],
  );
  const handleDescriptionChange = useCallback(
    (value) => {
      setDescription(value);
    },
    [setDescription],
  );
  const handleValueChange = useCallback(
    (value) => {
      setTotalValue(value);
    },
    [setTotalValue],
  );

  const dispatch = useDispatch();

  const handleConfirm = useCallback(() => {
    dispatch(entryList.creators.entryListAddAsync(name, description, totalValue));
    dispatch(modal.creators.modalClose('AddEntryModalWired'))
  }, [dispatch, name, description, totalValue]);

  const handleDeny = useCallback(() => {
    dispatch(modal.creators.modalClose('AddEntryModalWired'));
  }, [dispatch]);

  return (
    <AddEntryModal
      visible={visible}
      handleDeny={handleDeny}
      handleConfirm={handleConfirm}
      nameSlot={<EntryNameInput onChange={handleNameChange} initialValue={name} />}
      descriptionSlot={
        <EntryDescriptionInput
          onChange={handleDescriptionChange}
          initialValue={description}
        />
      }
      valueSlot={
        <EntryValueInput onChange={handleValueChange} initialValue={totalValue} />
      }
    />
  );
}

AddEntryModalWired.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default AddEntryModalWired;
