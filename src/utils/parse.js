export default {
  money: (value) => {
    return Number(value.replace('.', '').replace(',', '.'));
  },
};
