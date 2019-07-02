const floatToString = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format;

export default {
  floatToString,
};
