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
import LoadingSpinner from 'components/LoadingSpinner';
import Alert from 'components/Alert';

import { checkPaymentMethod } from 'schema/checkField';
import {
  PaymentMethodsDocument,
  usePaymentMethodQuery,
  usePaymentMethodUpdateOneMutation,
} from 'graphql-service/hooks';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

const initialValues = { name: '' };

export const PaymentMethodEditPage = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('paymentMethodEdit');
  const { data, loading, error } = usePaymentMethodQuery({
    variables: { where: { id } },
  });
  const [paymentMethodUpdate, { loading: loadingUpdate }] = usePaymentMethodUpdateOneMutation({
    refetchQueries: [{ query: PaymentMethodsDocument }],
  });

  const paymentMethod = data?.paymentMethod?.data;

  const [form, setForm] = useState<typeof initialValues>(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formValidate, setFormValidate] = useState(false);

  useEffect(() => {
    if (paymentMethod) {
      setForm({
        name: paymentMethod.name,
      });
    }
  }, [paymentMethod]);

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

  const handleUpdateEntity = async (event: React.ChangeEvent<HTMLFormElement>) => {
    if (!paymentMethod) return;

    event.preventDefault();
    try {
      await paymentMethodUpdate({
        variables: {
          paymentMethodUpdateOneId: paymentMethod.id,
          input: {
            name: form.name,
            accountId: paymentMethod?.accountId,
          },
        },
      });
      toast.success(`Payment Method ${paymentMethod.name} was been updated to ${form.name}!`, {
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
          {loading && <LoadingSpinner />}
          {data && (
            <Form onSubmit={handleUpdateEntity}>
              {error && <Alert isDanger>{error.message}</Alert>}
              <InputControl message={formErrors.name} isInvalid={!!formErrors.name}>
                <Input
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleInput}
                  defaultValue={paymentMethod?.name ?? ''}
                  placeholder={t('form.name')}
                />
              </InputControl>

              <Button disabled={!formValidate} variation="primary" type="submit">
                {loadingUpdate ? <LoadingSpinner size="20px" /> : t('form.action')}
              </Button>
            </Form>
          )}
        </Flex>
      </PageBody>
    </Page>
  );
};
