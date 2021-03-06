import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { Background } from '../../../.storybook/styles';

import EntryCard from './entry-card';
import EntryList from './index';

export default { title: 'Entry List | List', decorators: [withKnobs] };

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
