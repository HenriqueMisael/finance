import React from 'react';
import { useSelector } from 'react-redux';
import { Map } from 'immutable';

import modal from '../../store/modal';
import EntryModalWired from '../entry-list/entry-modal-wired';

const { getOpenedModals } = modal.selectors;

const modalList = Map([['AddEntryModal', EntryModalWired]]);

function ModalsWired() {
  const openedModals = useSelector(getOpenedModals);
  return modalList.toArray().map(([name, Modal]) => {
    const key = `modal-${name}`;
    return <Modal key={key} visible={openedModals.has(name)} />;
  });
}

export default ModalsWired;
