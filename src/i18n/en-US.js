const app = {
  title: 'Finance',
  menu: 'Menu',
};

const home = {
  title: 'Home',
};

const entryList = {
  title: '$t(entry_plural)',
  add: '$t(add) $t(entry)',
  addingNewEntry: 'Adding new $t(entry)',
};

const transactionMethodList = {
  title: '$t(transactionMethod_plural)',
  add: '$t(add) $t(transactionMethod)',
  descriptionSample: 'Ex.: credit card, bank transfer, etc.',
};

const profile = {
  title: 'Your Profile',
  instructions: 'Fill up your name and initial balance',
};

export default {
  add: 'Add',
  description: 'Description',
  done: 'Done',
  entry: 'Entry',
  entry_plural: 'Entries',
  name: 'Name',
  no: 'No',
  screen: 'Screen',
  transactionMethod: 'Transaction method',
  transactionMethod_plural: 'Transaction methods',
  title: 'Title',
  totalValue: 'Total $t(value)',
  value: 'Value',
  yes: 'Yes',
  app,
  home,
  entryList,
  transactionMethodList,
  profile,
};
