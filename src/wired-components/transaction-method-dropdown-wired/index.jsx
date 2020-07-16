import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import core from '../../store/core';
import Select from '../../components/input/Select';

const { getDescriptionByTransactionMethodID } = core.selectors;

function TransactionMethodDropdownWired({ onSelect, selected }) {
  const options = useSelector((state) =>
    getDescriptionByTransactionMethodID(state)
      .toArray()
      .map(([id, label]) => ({
        id,
        label,
      })),
  );

  return <Select options={options} onSelect={onSelect} selected={selected} />;
}

TransactionMethodDropdownWired.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
};

export default TransactionMethodDropdownWired;
