import * as yup from 'yup';

export const userSchema = yup.object().shape({
  firstName: yup.string().required('Required').min(3, 'Too Short!'),
  lastName: yup.string().required('Required').min(3, 'Too Short!'),
  email: yup.string().required('Required').email('Invalid Email!'),
  password: yup.string().required('Required').min(8, 'Too Short!').max(16, 'Too Long!'),
  passwordConfirm: yup.string().equals([yup.ref('password'), null], 'Passwords must match'),
});
