import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import entryList from '../../store/entry-list';
import modal from '../../store/modal';
import AddEntryModal from '../../components/entry-list/entry-modal';

import EntryDescriptionInputWired from './entry-description-input-wired';
import EntryNameInputWired from './entry-name-input-wired';
import EntryValueInputWired from './entry-value-input-wired';

const { entryListInsertionClear } = entryList.insertion.creators;

function AddEntryModalWired({ visible }) {
  const dispatch = useDispatch();

  const handleConfirm = useCallback(() => {
    dispatch(entryList.insertion.creators.entryListInsertionSubmitAsync());
    dispatch(entryListInsertionClear());
    dispatch(modal.creators.modalClose('AddEntryModal'));
  }, [dispatch]);

  const handleDeny = useCallback(() => {
    dispatch(modal.creators.modalClose('AddEntryModal'));
    dispatch(entryListInsertionClear());
  }, [dispatch]);

  return (
    <AddEntryModal
      visible={visible}
      handleDeny={handleDeny}
      handleConfirm={handleConfirm}
      nameSlot={<EntryNameInputWired />}
      descriptionSlot={<EntryDescriptionInputWired />}
      valueSlot={<EntryValueInputWired />}
    />
  );
}

AddEntryModalWired.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default AddEntryModalWired;
