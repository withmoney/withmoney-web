import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import AsyncCreatableSelect from 'react-select/creatable';
import Header from '../../../../components/Header';
import { PageHeader, Page, PageBody } from '../../style/SubPages.style';
import Flex from '../../../../components/Flex';
import Form from '../../../../components/Form';
import Input from '../../../../components/Input';
import InputCurrency from '../../../../components/InputCurrency';
import Button from '../../../../components/Button';
import Alert from '../../../../components/Alert';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import InputControl from '../../../../components/InputControl';
import { CreatedCardBrandText } from '../../../../constants/Transactions';
import customStyles from '../../Operations/Operation/style/CategorySelect.style';
import { useAccountFilters } from '../../../../hooks/useAccountFilters';
import { LANG } from '../../../../constants/currency';
import { useCreateCreditCard } from '../../../../hooks/useCreditCard';
import { checkCreditCard } from '../../../../schema/checkField';

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
  const handleCreditCard = async (brand: any) => {
    setForm({
      ...form,
      brand: brand.value,
    });
  };
  // check field validate
  const handleBlur = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = event.target;
    try {
      await checkCreditCard.validateAt(name, form);
      setFormErrors({ ...formErrors, [name]: '' });
    } catch (err) {
      setFormErrors({ ...formErrors, [name]: err.message });
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
      });
      toast.success(`Credit Card ${form.name} was been created!`, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      history.push('/credit-cards');
    } catch (err) {
      toast.error(err.message);
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
            <InputControl message={formErrors.name} isInvalid={!!formErrors.name}>
              <Label>Name</Label>
              <Input
                onBlur={handleBlur}
                onChange={handleInput}
                value={form.name}
                name="name"
                type="text"
                placeholder="Credit Card Name"
              />
            </InputControl>

            <InputControl>
              <Label>Brand</Label>
              <AsyncCreatableSelect
                name="brand"
                styles={customStyles}
                options={defaultOptions}
                onChange={handleCreditCard}
                placeholder="Select the Credit Card Brand"
              ></AsyncCreatableSelect>
            </InputControl>

            <InputControl>
              <Label>Credit card limit</Label>
              <InputCurrency
                name="limit"
                lang={LANG}
                value={form.limit}
                onChange={handleCurrency}
                currency={currentAccount?.currency}
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
