import React from 'react';
import { useSelector } from 'react-redux';
import { Set } from 'immutable';

import modal from '../../store/modal';
import AddEntryModalWired from '../entry-list/add-entry-modal-wired';

const { getOpenedModals } = modal.selectors;

const modalList = Set([AddEntryModalWired]);

function ModalsWired() {
  const openedModals = useSelector(getOpenedModals);
  return modalList.map((Modal) => {
    const { name } = Modal;
    const key = `modal-${name}`;
    return <Modal key={key} visible={openedModals.has(name)} />;
  });
}

export default ModalsWired;
