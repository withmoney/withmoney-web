import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../../../components/Header';
import { PageHeader, Page, PageBody } from '../../style/SubPages.style';
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
import { checkCategories } from '../../../../schema/checkField';

type Category = {
  id: string;
  name: string;
  type: string;
};

const initialValues = { id: '', name: '', type: '' };

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
        type: data?.findUniqueCategory.type,
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
      await checkCategories.validateAt(name, form);
      setFormErrors({ ...formErrors, [name]: '' });
      setFormValidate(await checkCategories.isValid(form));
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
          type: form.type,
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
          {data && (
            <Form onSubmit={handleUpdateCategory}>
              {error && <Alert isDanger>{error.message}</Alert>}
              <InputControl message={formErrors.name} isInvalid={!!formErrors.name}>
                <Input
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleInput}
                  defaultValue={data?.findUniqueCategory.name}
                />
              </InputControl>
              <InputControl message={formErrors.type} isInvalid={!!formErrors.type}>
                <Select
                  onBlur={handleBlur}
                  onChange={handleInput}
                  defaultValue={data?.findUniqueCategory.type}
                  style={{ width: '100%' }}
                  name="type"
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
