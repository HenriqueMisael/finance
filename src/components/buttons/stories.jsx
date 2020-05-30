import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, text, number, withKnobs } from '@storybook/addon-knobs';
import { Md3DRotation, MdAdd } from 'react-icons/md';

import { Centered } from '../../../.storybook/styles';

import PrimaryButton from './primary';
import LinkButton from './link';
import IconButton from './icon';
import ListItemButton from './list-item';
import ToggleButton from './toggle';

export default { title: 'General Components | Button', decorators: [withKnobs] };

export const primaryButton = () => (
  <Centered fontSize={number('Font size', 16)}>
    <PrimaryButton
      onClick={action('Clicked primary button')}
      disabled={boolean('Disabled', false)}
    >
      {text('Button text', 'Primary Button')}
    </PrimaryButton>
  </Centered>
);

export const linkButton = () => (
  <Centered fontSize={number('Font size', 16)}>
    <LinkButton
      onClick={action('Clicked link button')}
      disabled={boolean('Disabled', false)}
    >
      {text('Button text', 'Link Button')}
    </LinkButton>
  </Centered>
);

export const iconButton = () => (
  <Centered fontSize={number('Font size', 16)}>
    <IconButton
      ariaLabel="Story example"
      onClick={action('Clicked icon button')}
      disabled={boolean('Disabled', false)}
    >
      <Md3DRotation />
    </IconButton>
  </Centered>
);

export const listItemButton = () => (
  <Centered fontSize={number('Font size', 16)}>
    <ListItemButton
      onClick={action('Clicked list item button')}
      disabled={boolean('Disabled', false)}
    >
      <MdAdd />
    </ListItemButton>
  </Centered>
);

export const toggleButton = () => (
  <Centered fontSize={number('Font size', 16)}>
    <ToggleButton
      onChange={action('Toggled button')}
      initialValue={false}
      steps={text('Steps', 'false,true')
        .split(',')
        .map((value) => value.trim())}
    />
  </Centered>
);
