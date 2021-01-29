import * as yup from 'yup';

const checkFields = yup.object().shape({
  name: yup.string().required('Required'),
  typeOrCurrency: yup.string().required('Required'),
});

export default checkFields;
