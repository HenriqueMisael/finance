import React from 'react';
import { withKnobs, number, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { MdDelete, MdModeEdit } from 'react-icons/md';

import { Background, Centered } from '../../../.storybook/styles';
import IconButton from '../buttons/icon';

import EntryCard from './entry-card';
import EntryList from './index';
import EntryNameInput from './entry-name-input';
import EntryDescriptionInput from './entry-description-input';
import EntryValueInput from './entry-value-input';
import EntryCardActions from './entry-card-actions';

export default { title: 'Entry List', decorators: [withKnobs] };

export const entryList = () => (
  <Background>
    <EntryList>
      <EntryCard
        title="Mercado Livre"
        description="Celulares Xiaomi Redmi 7 x2"
        value={-1280}
      />
      <EntryCard
        title="Mercado Muffato"
        description="Salgadinhos, queijo e salada"
        value={-32.8}
      />
      <EntryCard
        title="Mercado Pago"
        description="Venda notebook Acer Aspire"
        value={2550}
      />
      <EntryCard
        title="Garagem Sarandi"
        description="Compra do carro voyage"
        value={-30000}
      />
      <EntryCard
        title="Objective Solutions"
        description="Salário mensal referente a fevereiro"
        value={1800}
      />
      <EntryCard
        title="Açougue Paris 3"
        description="Carne moída para hambúrguer e maionese"
        value={-35.9}
      />
    </EntryList>
  </Background>
);

export const entryCard = () => (
  <Centered>
    <EntryCard
      title={text('Title', 'Mercado Livre')}
      description={text('Description', 'Compra de celulares Xiaomi')}
      value={number('Value', -1280)}
    />
  </Centered>
);

export const entryCardWithActions = () => (
  <Centered padding>
    <EntryCard
      title={text('Title', 'Mercado Livre')}
      description={text('Description', 'Compra de celulares Xiaomi')}
      value={number('Value', -1280)}
    >
      <EntryCardActions>
        <IconButton onClick={action('Clicked delete button')}>
          <MdDelete />
        </IconButton>
        <IconButton onClick={action('Clicked edit button')}>
          <MdModeEdit />
        </IconButton>
      </EntryCardActions>
    </EntryCard>
  </Centered>
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
