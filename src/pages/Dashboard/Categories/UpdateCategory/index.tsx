import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from 'components/Header';
import { PageHeader, Page, PageBody } from 'pages/Dashboard/style/SubPages.style';
import Flex from 'components/Flex';
import Form from 'components/Form';
import Input from 'components/Input';
import InputControl from 'components/InputControl';
import Button from 'components/Button';
import Select from 'components/Select';
import LoadingSpinner from 'components/LoadingSpinner';
import Alert from 'components/Alert';
import { transactionType } from 'constants/Transactions';
import { useUniqueCategory } from 'hooks/useCategories';
import { checkCategories } from 'schema/checkField';
import { FilterCategoriesDocument, useUpdateCategoryMutation } from 'graphql-service/hooks';
import { z } from 'zod';
import { TransactionType } from 'graphql-service/types';

type Category = {
  id: string;
  name: string;
  type: string;
  operationType: string;
};

const initialValues = { id: '', name: '', type: '', operationType: '' };

const UpdateCategory = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useUniqueCategory(id);
  const [updateCategory, { loading: loadingUpdate }] = useUpdateCategoryMutation({
    refetchQueries: [{ query: FilterCategoriesDocument }],
  });

  const [form, setForm] = useState<Category>(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formValidate, setFormValidate] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({
        id: id,
        name: data?.findUniqueCategory.name,
        type: data?.findUniqueCategory.type,
        operationType: data?.findUniqueCategory.operationType,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value.trim(),
    });
  };

  const handleBlur = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    try {
      const fieldSchema = checkCategories.shape[name as keyof typeof checkCategories.shape];
      fieldSchema.parse(value);

      setFormErrors({ ...formErrors, [name]: '' });
      setFormValidate(checkCategories.safeParse(form).success);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldError = err.errors.find((e) => e.path[0] === name)?.message || 'Invalid value';
        setFormErrors({ ...formErrors, [name]: fieldError });
      }
    }
  };

  const handleUpdateCategory = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateCategory({
        variables: {
          id,
          input: {
            name: form.name,
            type: form.type as TransactionType,
          },
        },
      });
      toast.success(`Category ${data.findUniqueCategory.name} was been updated to ${form.name}!`, {
        position: 'bottom-left',
      });
      history.push('/categories');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, { position: 'bottom-left', draggable: false });
      }
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
                  {transactionType.map((operation) => (
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
