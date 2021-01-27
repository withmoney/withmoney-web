import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../../../components/Header';
import Form from '../../../../components/Form';
import Input from '../../../../components/Input';
import InputGroup from '../../../../components/InputGroup';
import InputControl from '../../../../components/InputControl';
import Button from '../../../../components/Button';
import Flex from '../../../../components/Flex';
import Select from '../../../../components/Select';
import { checkAddAccount } from '../../../../schema/checkField';
import { currencies } from '../../../../constants/Currencies';
import { useCreateAccount } from '../../../../hooks/useAccounts';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { PageHeader, Page, PageBody } from '../styles';

const initialValues = {
  accountName: '',
  accountCurrency: '',
};

const AddAccount = () => {
  const [form, setAccountName] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formValidate, setFormValidate] = useState(false);
  const { createAccount, loading, error } = useCreateAccount();
  const history = useHistory();

  useEffect(() => {
    const checkForm = async () => {
      setFormValidate(await checkAddAccount.isValid(form));
    };
    checkForm();
  });

  const handleInput = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setAccountName({
      ...form,
      [name]: value.trim(),
    });
  };

  const handleBlur = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = event.target;
    try {
      await checkAddAccount.validateAt(name, form);
      setFormErrors({ ...formErrors, [name]: '' });
    } catch (err) {
      setFormErrors({ ...formErrors, [name]: err.message });
    }
  };

  const handleCreateAccount = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createAccount({
        variables: { name: form.accountName, currency: form.accountCurrency },
      });
      toast.success(`Account ${form.accountName} was been created!`, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      history.push('/accounts');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Page>
      <PageHeader>
        <Header margin="auto" as="h3">
          Add Account
        </Header>
      </PageHeader>
      <PageBody>
        <Flex>
          <Form onSubmit={handleCreateAccount}>
            <InputGroup>
              <InputControl message={formErrors.accountName} isInvalid={!!formErrors.accountName}>
                <Input
                  isInvalid={!!formErrors.accountName}
                  type="text"
                  name="accountName"
                  value={form.accountName}
                  placeholder="Account Name"
                  onBlur={handleBlur}
                  onChange={handleInput}
                />
              </InputControl>
              <InputControl
                message={formErrors.accountCurrency}
                isInvalid={!!formErrors.accountCurrency}
              >
                <Select name="accountCurrency" onChange={handleInput} onBlur={handleBlur}>
                  <option>Select your currency</option>
                  {currencies.map((currency) => {
                    return (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    );
                  })}
                </Select>
              </InputControl>
            </InputGroup>

            <Button disabled={!formValidate} type="submit" variation="primary">
              {loading ? <LoadingSpinner size="20px" /> : 'Create Account'}
            </Button>
          </Form>
          {error && window.alert(error.message)}
        </Flex>
      </PageBody>
    </Page>
  );
};

export default AddAccount;
