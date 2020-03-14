import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import core from '../../store/core';

import EntryCard from '../../components/entry-list/entry-card';

const { getEntryByEntryID } = core.selectors;

function EntryCardWired({ entryID }) {
  const entry = useSelector(getEntryByEntryID).get(entryID);

  return (
    <EntryCard value={entry.value} description={entry.description} title={entry.title} />
  );
}

EntryCardWired.propTypes = {
  entryID: PropTypes.string.isRequired,
};

export default EntryCardWired;
