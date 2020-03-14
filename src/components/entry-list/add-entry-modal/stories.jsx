import React from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Centered } from '../../../../.storybook/styles';

import EntryNameInput from './entry-name-input';
import EntryDescriptionInput from './entry-description-input';
import EntryValueInput from './entry-value-input';
import AddEntryModal from './add-entry-modal';

export default { title: 'Entry List | Add Entry Modal', decorators: [withKnobs] };

export const complete = () => (
  <AddEntryModal
    visible={boolean('Visible', true)}
    handleDeny={action('Clicked deny button')}
    handleConfirm={action('Clicked confirm button')}
    nameSlot={<EntryNameInput initialValue="" />}
    descriptionSlot={<EntryDescriptionInput initialValue="" />}
    valueSlot={<EntryValueInput initialValue={1} />}
  />
);

export const entryNameInput = () => (
  <Centered>
    <EntryNameInput onChange={action('Changed name')} initialValue="" />
  </Centered>
);

export const entryDescriptionInput = () => (
  <Centered>
    <EntryDescriptionInput onChange={action('Changed description')} initialValue="" />
  </Centered>
);

export const entryValueInput = () => (
  <Centered>
    <EntryValueInput onChange={action('Changed description')} initialValue={0} />
  </Centered>
);
