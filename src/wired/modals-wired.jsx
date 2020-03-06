import React from 'react';
import { useSelector } from 'react-redux';
import { Set } from 'immutable';

import modal from '../store/modal';

import TestModal from './test';

const { getOpenedModals } = modal.selectors;

const modalList = Set([TestModal]);

function ModalsWired() {
  const openedModals = useSelector(getOpenedModals);

  return modalList.map((Modal) => {
    const { name } = Modal;
    const key = `modal-${name}`;
    return <Modal key={key} visible={openedModals.has(name)} />;
  });
}

export default ModalsWired;
