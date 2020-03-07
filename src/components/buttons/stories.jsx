import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { Md3DRotation, MdAdd } from 'react-icons/md';

import { Centered } from '../../../.storybook/styles';

import PrimaryButton from './primary';
import LinkButton from './link';
import IconButton from './icon';
import ListItemButton from './list-item';

export default { title: 'General Components | Button', decorators: [withKnobs] };

export const standardButtons = () => (
  <Centered fontSize={number('Font size', 16)}>
    <PrimaryButton
      onClick={action('Clicked primary button')}
      disabled={boolean('Disabled', false)}
    >
      Primary Button
    </PrimaryButton>
    <LinkButton
      onClick={action('Clicked link button')}
      disabled={boolean('Disabled', false)}
    >
      Link Button
    </LinkButton>
    <IconButton
      onClick={action('Clicked icon button')}
      disabled={boolean('Disabled', false)}
    >
      <Md3DRotation />
    </IconButton>
  </Centered>
);

export const listItemButton = () => (
  <Centered>
    <ListItemButton
      onClick={action('Clicked list item button')}
      disabled={boolean('Disabled', false)}
    >
      <MdAdd />
    </ListItemButton>
  </Centered>
)
