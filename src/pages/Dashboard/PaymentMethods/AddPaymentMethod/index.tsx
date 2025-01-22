import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from 'components/Header';
import Flex from 'components/Flex';
import Form from 'components/Form';
import Input from 'components/Input';
import Button from 'components/Button';
import Alert from 'components/Alert';
import LoadingSpinner from 'components/LoadingSpinner';
import InputControl from 'components/InputControl';
import { PageHeader, Page, PageBody } from 'pages/Dashboard/style/SubPages.style';
import { checkPaymentMethod } from 'schema/checkField';
import { z } from 'zod';
import { usePaymentMethodCreateOneMutation } from 'graphql-service/hooks';
import { useAccountFilters } from 'hooks/useAccountFilters';
import { useTranslation } from 'react-i18next';

const initialValues = {
  name: '',
};

export const AddPaymentMethodPage = () => {
  const [form, setForm] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formValidate, setFormValidate] = useState(false);
  const [createPaymentMethod, { loading, error }] = usePaymentMethodCreateOneMutation();
  const history = useHistory();
  const { currentAccount } = useAccountFilters();
  const { t } = useTranslation('paymentMethodAdd');

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
      checkPaymentMethod.parse(form);

      setFormErrors({ ...formErrors, [name]: '' });
      setFormValidate(checkPaymentMethod.safeParse(form).success);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldError = err.errors.find((e) => e.path[0] === name)?.message || 'Invalid value';
        setFormErrors({ ...formErrors, [name]: fieldError });
      }
    }
  };

  useEffect(() => {
    const checkForm = async () => {
      setFormValidate(checkPaymentMethod.safeParse(form).success);
    };
    checkForm();
  });

  const handleCreatePaymentMethod = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentAccount === undefined) return;
    try {
      await createPaymentMethod({
        variables: { input: { name: form.name, accountId: currentAccount.id } },
      });

      toast.success(t('message.success', { name: form.name }) as string, {
        position: 'bottom-left',
      });
      history.push('/payment-methods');
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
          {t('title')}
        </Header>
      </PageHeader>
      <PageBody>
        <Flex justifyContent="center">
          <Form onSubmit={handleCreatePaymentMethod}>
            {error && <Alert isDanger>{error.message}</Alert>}
            <InputControl message={formErrors.name} isInvalid={!!formErrors.name}>
              <Input
                name="name"
                onBlur={handleBlur}
                onChange={handleInput}
                placeholder={t('form.name')}
              />
            </InputControl>

            <Button disabled={!formValidate} variation="primary" type="submit">
              {loading ? <LoadingSpinner size="20px" /> : t('form.action')}
            </Button>
          </Form>
        </Flex>
      </PageBody>
    </Page>
  );
};
