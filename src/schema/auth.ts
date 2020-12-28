import * as yup from 'yup';
/* @ts-ignore */
import isStrongPassword from 'validator/lib/isStrongPassword';

export const registerSchema = yup.object().shape({
  firstName: yup.string().required('Required').min(3, 'Too Short!'),
  lastName: yup.string().required('Required').min(3, 'Too Short!'),
  email: yup.string().required('Required').email('Invalid Email!'),
  password: yup
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
  passwordConfirm: yup.string().equals([yup.ref('password'), null], 'Passwords must match'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid Email!').required('Required'),
  password: yup.string().required('Required'),
});

export const checkEmailSchema = yup.object().shape({
  email: yup.string().email('Invalid Email!').required('Required'),
});

export const checkPasswordSchema = yup.object().shape({
  password: yup
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
  passwordConfirm: yup.string().equals([yup.ref('password'), null], 'Passwords must match'),
});
