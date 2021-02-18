import * as yup from 'yup';
/* @ts-ignore */
import isStrongPassword from 'validator/lib/isStrongPassword';

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

export const checkUpdateUser = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  email: yup.string().required('Required').email('Invalid Email!'),
  language: yup.string().required('Required'),
});

export const checkUpdatePassword = yup.object().shape({
  currentPassword: yup.string().required('Required'),
  newPassword: yup
    .string()
    .required('Required')
    .min(8, 'Too Short!')
    .test(
      'password',
      "Your password is weak, it's need at least one letter on Lower case, one letter on upper case, one number and one symbol",
      (value: string = '') =>
        isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 0,
          minSymbols: 0,
          returnScore: false,
        }),
    ),
  confirmPassword: yup
    .string()
    .equals([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required'),
});
