import * as yup from 'yup';

export const checkAddAccount = yup.object().shape({
  accountName: yup.string().required('Required'),
  accountCurrency: yup.string().required('Required'),
});
