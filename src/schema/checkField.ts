import * as yup from 'yup';

export const checkCategories = yup.object().shape({
  name: yup.string().required('Required'),
  type: yup.string().required('Required'),
});

export const checkAccounts = yup.object().shape({
  name: yup.string().required('Required'),
  currency: yup.string().required('Required'),
});

export const checkCreditCard = yup.object().shape({
  name: yup.string().required('Required'),
  brand: yup.string().required('Required'),
  limit: yup.number().required('Required'),
});
