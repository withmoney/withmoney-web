import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../../../components/Header';
import { PageHeader, Page, PageBody } from '../styles';
import Flex from '../../../../components/Flex';
import Form from '../../../../components/Form';
import Input from '../../../../components/Input';
import InputControl from '../../../../components/InputControl';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import Alert from '../../../../components/Alert';
import { operationType } from '../../../../constants/Transactions';
import { useUniqueCategory, useUpdateCategory } from '../../../../hooks/useCategories';
import checkFields from '../../../../schema/checkField';

type Category = {
  id: string;
  name: string;
  typeOrCurrency: string;
};

const initialValues = { id: '', name: '', typeOrCurrency: '' };

const UpdateCategory = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useUniqueCategory(id);
  const { updateCategory, loading: loadingUpdate } = useUpdateCategory();
  const [form, setForm] = useState<Category>(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formValidate, setFormValidate] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({
        id: id,
        name: data?.findUniqueCategory.name,
        typeOrCurrency: data?.findUniqueCategory.type,
      });
    }
  }, [data]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value.trim(),
    });
  };

  const handleBlur = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = event.target;
    try {
      await checkFields.validateAt(name, form);
      setFormErrors({ ...formErrors, [name]: '' });
      setFormValidate(await checkFields.isValid(form));
    } catch (err) {
      setFormErrors({ ...formErrors, [name]: err.message });
    }
  };

  const handleUpdateCategory = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateCategory({
        variables: {
          id,
          name: form.name,
          type: form.typeOrCurrency,
        },
      });
      toast.success(`Category ${data.findUniqueCategory.name} was been updated to ${form.name}!`, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      history.push('/categories');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Page>
      <PageHeader>
        <Header margin="auto" as="h3">
          Update Category
        </Header>
      </PageHeader>
      <PageBody>
        <Flex justifyContent="center">
          {loading && <LoadingSpinner />}
          {error && <Alert isDanger>{error.message}</Alert>}
          {data && (
            <Form onSubmit={handleUpdateCategory}>
              <InputControl message={formErrors.name} isInvalid={!!formErrors.name}>
                <Input
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleInput}
                  defaultValue={data?.findUniqueCategory.name}
                />
              </InputControl>
              <InputControl
                message={formErrors.typeOrCurrency}
                isInvalid={!!formErrors.typeOrCurrency}
              >
                <Select
                  onBlur={handleBlur}
                  onChange={handleInput}
                  defaultValue={data?.findUniqueCategory.type}
                  style={{ width: '100%' }}
                  name="typeOrCurrency"
                >
                  <option value="">Select category type</option>
                  {operationType.map((operation) => (
                    <option key={operation.toString()} value={operation}>
                      {operation}
                    </option>
                  ))}
                </Select>
              </InputControl>
              <Button disabled={!formValidate} variation="primary" type="submit">
                {loadingUpdate ? <LoadingSpinner size="20px" /> : 'Update Category'}
              </Button>
            </Form>
          )}
        </Flex>
      </PageBody>
    </Page>
  );
};
export default UpdateCategory;
