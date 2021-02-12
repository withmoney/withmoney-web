import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
import { LANG } from '../../../../constants/currency';
import customStyles from '../../Operations/Operation/style/CategorySelect.style';
import { checkCreditCard } from '../../../../schema/checkField';
import { useUniqueCreditCard, useUpdateCreditCard } from '../../../../hooks/useCreditCard';
import { useAccountFilters } from '../../../../hooks/useAccountFilters';

const initialValues = {
  name: '',
  brand: '',
  limit: 0,
};

const defaultOptions = CreatedCardBrandText.map((creditCard) => ({
  value: creditCard,
  label: creditCard,
}));

const UpdateCreditCard = () => {
  const history = useHistory();
  const { currentAccount } = useAccountFilters();
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useUniqueCreditCard(id);
  const [form, setForm] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formValidate, setFormValidate] = useState(false);
  const { updateCreditCard, loading: loadingUpdate } = useUpdateCreditCard();

  // set form
  useEffect(() => {
    if (data) {
      setForm({
        name: data?.findUniqueCreditCard.name,
        brand: data?.findUniqueCreditCard.brand,
        limit: data?.findUniqueCreditCard.limit,
      });
    }
  }, [data]);

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
    setFormValidate(await checkCreditCard.isValid(form));
  };
  // handle on bluer field
  const handleBlur = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = event.target;
    try {
      await checkCreditCard.validateAt(name, form);
      setFormErrors({ ...formErrors, [name]: '' });
      setFormValidate(await checkCreditCard.isValid(form));
    } catch (err) {
      setFormErrors({ ...formErrors, [name]: err.message });
    }
  };
  // create update credit card
  const handleUpdateCreditCard = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await updateCreditCard({
        variables: {
          id,
          name: form.name,
          brand: form.brand,
          limit: form.limit,
          account: currentAccount?.id,
        },
      });
      toast.success(
        `Credit card ${data.findUniqueCreditCard.name} was been updated to ${form.name}!`,
        {
          position: toast.POSITION.BOTTOM_LEFT,
        },
      );
      history.push('/credit-cards');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Page>
      <PageHeader>
        <Header margin="auto" as="h3">
          Update Credit Card
        </Header>
      </PageHeader>
      <PageBody>
        <Flex justifyContent="center">
          {loading && <LoadingSpinner />}
          {data?.findUniqueCreditCard && (
            <Form>
              {error && <Alert isDanger>{error.message}</Alert>}
              <InputControl message={formErrors.name} isInvalid={!!formErrors.name}>
                <Label>Credit card name</Label>
                <Input
                  defaultValue={data.findUniqueCreditCard.name}
                  onBlur={handleBlur}
                  onChange={handleInput}
                  name="name"
                  type="text"
                ></Input>
              </InputControl>

              <InputControl>
                <Label>Credit card brand</Label>
                <AsyncCreatableSelect
                  name="brand"
                  styles={customStyles}
                  options={defaultOptions}
                  onChange={handleCreditCard}
                  defaultValue={{
                    value: data?.findUniqueCreditCard.brand,
                    label: data?.findUniqueCreditCard.brand,
                  }}
                ></AsyncCreatableSelect>
              </InputControl>

              <InputControl>
                <Label>Credit card limit</Label>
                <InputCurrency
                  name="limit"
                  lang={LANG}
                  value={data?.findUniqueCreditCard.limit}
                  onChange={handleCurrency}
                  currency={currentAccount?.currency}
                  onBlur={handleBlur}
                />
              </InputControl>
              <Flex justifyContent="flex-end">
                <Button
                  disabled={!formValidate || loading}
                  onClick={(e) => handleUpdateCreditCard(e)}
                  variation="primary"
                  type="button"
                >
                  {loading ? <LoadingSpinner size="20px" /> : 'Update'}
                </Button>
              </Flex>
            </Form>
          )}
        </Flex>
      </PageBody>
    </Page>
  );
};

const Label = styled.label`
  padding: 5px;
`;
export default UpdateCreditCard;
