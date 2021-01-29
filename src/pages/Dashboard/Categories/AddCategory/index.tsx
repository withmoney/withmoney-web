import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../../../components/Header';
import Flex from '../../../../components/Flex';
import Form from '../../../../components/Form';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Alert from '../../../../components/Alert';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import InputControl from '../../../../components/InputControl';
import Select from '../../../../components/Select';
import { PageHeader, Page, PageBody } from '../styles';
import { operationType } from '../../../../constants/Transactions';
import checkFields from '../../../../schema/checkField';
import { useCreateCategory } from '../../../../hooks/useCategories';
import { toast } from 'react-toastify';

const initialValues = {
  name: '',
  typeOrCurrency: '',
};

const AddCategory = () => {
  const [form, setForm] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formValidate, setFormValidate] = useState(false);
  const { createCategory, loading, error } = useCreateCategory();
  const history = useHistory();

  const handleInput = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    } catch (err) {
      setFormErrors({ ...formErrors, [name]: err.message });
    }
  };

  useEffect(() => {
    const checkForm = async () => {
      setFormValidate(await checkFields.isValid(form));
    };
    checkForm();
  });

  const handleCreateCategory = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createCategory({ variables: { name: form.name, type: form.typeOrCurrency } });
      toast.success(`Category ${form.name} was been created!`, {
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
          Add Category
        </Header>
      </PageHeader>
      <PageBody>
        <Flex justifyContent="center">
          <Form onSubmit={handleCreateCategory}>
            {error && <Alert isDanger>{error.message}</Alert>}
            <InputControl message={formErrors.name} isInvalid={!!formErrors.name}>
              <Input
                name="name"
                onBlur={handleBlur}
                onChange={handleInput}
                placeholder="Category name"
              ></Input>
            </InputControl>

            <InputControl
              message={formErrors.typeOrCurrency}
              isInvalid={!!formErrors.typeOrCurrency}
            >
              <Select
                name="typeOrCurrency"
                onBlur={handleBlur}
                onChange={handleInput}
                style={{ width: '100%' }}
              >
                <option value="">Select operation type</option>
                {operationType.map((operation) => (
                  <option key={operation.toString()} value={operation}>
                    {operation}
                  </option>
                ))}
              </Select>
            </InputControl>
            <Button disabled={!formValidate} variation="primary" type="submit">
              {loading ? <LoadingSpinner size="20px" /> : 'Create category'}
            </Button>
          </Form>
        </Flex>
      </PageBody>
    </Page>
  );
};

export default AddCategory;
