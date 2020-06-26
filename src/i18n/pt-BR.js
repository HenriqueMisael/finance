const app = {
  title: 'Finanças',
  menu: 'Menu',
};

const home = {
  title: 'Home',
};

const entryList = {
  title: '$t(entry_plural)',
  add: '$t(add) $t(entry)',
  addingNewEntry: 'Adicionar novo $t(entry)',
};

const transactionMethodList = {
  title: '$t(transactionMethod_plural)',
  add: '$t(add) $t(transactionMethod)',
  descriptionSample: 'Ex.: cartão de crédito, transferência bancária, etc.',
};

const profile = {
  title: 'Seu Perfil',
  instructions: 'Preencha seu nome e saldo inicial',
};

export default {
  add: 'Adicionar',
  description: 'Descrição',
  done: 'Concluído',
  entry: 'Lançamento',
  entry_plural: 'Lançamentos',
  name: 'Nome',
  no: 'Não',
  screen: 'Tela',
  transactionMethod: 'Meio de transação',
  transactionMethod_plural: 'Meios de transação',
  title: 'Título',
  totalValue: '$t(value) Total',
  value: 'Valor',
  yes: 'Sim',
  app,
  home,
  entryList,
  transactionMethodList,
  profile,
};
