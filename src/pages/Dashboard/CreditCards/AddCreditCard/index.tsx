import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import AsyncCreatableSelect from 'react-select/creatable';
import Header from 'components/Header';
import { PageHeader, Page, PageBody } from 'pages/Dashboard/style/SubPages.style';
import Flex from 'components/Flex';
import Form from 'components/Form';
import Input from 'components/Input';
import InputCurrency from 'components/InputCurrency';
import Button from 'components/Button';
import Alert from 'components/Alert';
import LoadingSpinner from 'components/LoadingSpinner';
import InputControl from 'components/InputControl';
import { CreatedCardBrandText } from 'constants/Transactions';
import customStyles from 'pages/Dashboard/Operations/Operation/style/CategorySelect.style';
import { useAccountFilters } from 'hooks/useAccountFilters';
import { useUserLanguage } from 'hooks/useUser';
import { useCreateCreditCard } from 'hooks/useCreditCard';
import { checkCreditCard } from 'schema/checkField';
import { ALL_CREDIT_CARDS_LIMIT } from 'graphql-service/gqls/CreditCard';
import { ValueType } from 'react-select';
import { CreditCardBrand } from 'graphql-service/types';

const initialValues = {
  name: '',
  brand: '',
  limit: 0,
};

const defaultOptions = CreatedCardBrandText.map((creditCard) => ({
  value: creditCard,
  label: creditCard,
}));

const AddCreditCard = () => {
  const { currentAccount } = useAccountFilters();
  const { value: language } = useUserLanguage();
  const [form, setForm] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formValidate, setFormValidate] = useState(false);
  const { createCreditCard, loading, error } = useCreateCreditCard();
  const history = useHistory();

  // check form validate
  useEffect(() => {
    const checkForm = async () => {
      setFormValidate(await checkCreditCard.isValid(form));
    };
    checkForm();
  }, [form]);

  // handle Name input
  const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setForm({
      ...form,
      name: value,
    });
  };

  // handle currency input
  const handleCurrency = async (value: number) => {
    setForm({
      ...form,
      limit: value,
    });
  };

  // handle creditCard input
  const handleCreditCard = async (brand: ValueType<{ value: string; label: string }, false>) => {
    if (brand) {
      setForm({
        ...form,
        brand: brand.value as CreditCardBrand,
      });
    }
  };
  // check field validate
  const handleBlur = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = event.target;
    try {
      await checkCreditCard.validateAt(name, form);
      setFormErrors({ ...formErrors, [name]: '' });
    } catch (err) {
      if (err instanceof Error) {
        setFormErrors({ ...formErrors, [name]: err.message });
      }
    }
  };

  // create Credit Card
  const handleCreateCategory = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await createCreditCard({
        variables: {
          name: form.name,
          limit: form.limit,
          brand: form.brand,
          account: currentAccount?.id,
        },

        refetchQueries: [
          { query: ALL_CREDIT_CARDS_LIMIT, variables: { accountId: currentAccount?.id } },
        ],
      });
      toast.success(`Credit Card ${form.name} was been created!`, {
        position: 'bottom-left',
      });
      history.push('/credit-cards');
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
          Add Credit Card
        </Header>
      </PageHeader>
      <PageBody>
        <Flex justifyContent="center">
          <Form>
            {error && <Alert isDanger>{error.message}</Alert>}
            {language && currentAccount ? (
              <>
                <InputControl message={formErrors.name} isInvalid={!!formErrors.name}>
                  <Label>Name</Label>
                  <Input
                    onBlur={handleBlur}
                    onChange={handleInput}
                    value={form.name}
                    name="name"
                    type="text"
                  ></Input>
                </InputControl>

                <InputControl>
                  <Label>Brand</Label>
                  <AsyncCreatableSelect
                    name="brand"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    styles={customStyles}
                    options={defaultOptions}
                    onChange={handleCreditCard}
                  ></AsyncCreatableSelect>
                </InputControl>

                <InputControl>
                  <Label>Limit</Label>
                  <InputCurrency
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    name="limit"
                    lang={language}
                    value={form.limit}
                    onChange={handleCurrency}
                    currency={currentAccount.currency}
                  />
                </InputControl>
                <Flex justifyContent="flex-end">
                  <Button
                    disabled={!formValidate || loading}
                    onClick={(e) => handleCreateCategory(e)}
                    variation="primary"
                    type="button"
                  >
                    {loading ? <LoadingSpinner size="20px" /> : 'Create'}
                  </Button>
                </Flex>
              </>
            ) : (
              <LoadingSpinner />
            )}
          </Form>
        </Flex>
      </PageBody>
    </Page>
  );
};

const Label = styled.label`
  padding: 5px;
`;

export default AddCreditCard;
