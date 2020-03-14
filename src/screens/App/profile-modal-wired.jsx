import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import modal from '../../store/modal';
import profile from '../../store/profile';
import ProfileNameInput from '../../components/modal/profile/name-input';
import ProfileModal from '../../components/modal/profile';
import MoneyInput from '../../components/input/money';

const { profileSaveAsync } = profile.creators;
const { modalClose } = modal.creators;

function ProfileModalWired({ visible }) {
  const [name, setName] = useState('');
  const [initialBalance, setInitialBalance] = useState(0);

  const dispatch = useDispatch();

  const handleConfirm = useCallback(() => {
    dispatch(profileSaveAsync(name, initialBalance));
    dispatch(modalClose('ProfileModal'));
  }, [dispatch, name, initialBalance]);

  return (
    <ProfileModal
      nameSlot={<ProfileNameInput initialValue={name} onChange={setName} />}
      initialBalanceSlot={
        <MoneyInput initialValue={initialBalance} onSubmitChange={setInitialBalance} />
      }
      onConfirm={handleConfirm}
      visible={visible}
    />
  );
}

ProfileModalWired.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default ProfileModalWired;
