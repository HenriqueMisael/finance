import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import entryList from '../../store/entry-list';
import modal from '../../store/modal';
import EntryModal from '../../components/entry-list/entry-modal';

import EntryDescriptionInputWired from './entry-description-input-wired';
import EntryNameInputWired from './entry-name-input-wired';
import EntryValueInputWired from './entry-value-input-wired';

const { entryListEditingClear } = entryList.editing.creators;

function EntryModalWired({ visible }) {
  const dispatch = useDispatch();

  const handleConfirm = useCallback(() => {
    dispatch(entryList.editing.creators.entryListEditingSubmitAsync());
    dispatch(entryListEditingClear());
    dispatch(modal.creators.modalClose('EntryModal'));
  }, [dispatch]);

  const handleDeny = useCallback(() => {
    dispatch(modal.creators.modalClose('EntryModal'));
    dispatch(entryListEditingClear());
  }, [dispatch]);

  return (
    <EntryModal
      visible={visible}
      handleDeny={handleDeny}
      handleConfirm={handleConfirm}
      nameSlot={<EntryNameInputWired />}
      descriptionSlot={<EntryDescriptionInputWired />}
      valueSlot={<EntryValueInputWired />}
    />
  );
}

EntryModalWired.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default EntryModalWired;
