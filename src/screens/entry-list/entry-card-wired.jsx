import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import core from '../../store/core';

import EntryCardActionsWired from './entry-card-actions-wired';
import EntryCard from '../../components/entry-list/entry-card';

const { getEntryByEntryID } = core.selectors;

function EntryCardWired({ entryID }) {
  const entry = useSelector(getEntryByEntryID).get(entryID);

  return (
    <EntryCard
      id={`entry-${entryID}`}
      value={entry.value}
      description={entry.description}
      title={entry.title}
    >
      <EntryCardActionsWired entryID={entryID} />
    </EntryCard>
  );
}

EntryCardWired.propTypes = {
  entryID: PropTypes.string.isRequired,
};

export default EntryCardWired;
