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
import { checkAccounts } from '../../../../schema/checkField';
import { currencies } from '../../../../constants/Currencies';
import { useCreateAccount } from '../../../../hooks/useAccounts';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import Alert from '../../../../components/Alert';
import { PageHeader, Page, PageBody } from '../../style/SubPages.style';

const initialValues = {
  name: '',
  currency: '',
};

const AddAccount = () => {
  const [form, setAccountName] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formValidate, setFormValidate] = useState(false);
  const { createAccount, loading, error } = useCreateAccount();
  const history = useHistory();

  useEffect(() => {
    const checkForm = async () => {
      setFormValidate(await checkAccounts.isValid(form));
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
      await checkAccounts.validateAt(name, form);
      setFormErrors({ ...formErrors, [name]: '' });
    } catch (err) {
      setFormErrors({ ...formErrors, [name]: err.message });
    }
  };

  const handleCreateAccount = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createAccount({
        variables: form,
      });
      toast.success(`Account ${form.name} was been created!`, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      history.push('/accounts');
    } catch (err) {
      toast.error(err.message, { position: toast.POSITION.BOTTOM_LEFT, draggable: false });
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
            {error && <Alert isDanger>{error.message}</Alert>}
            <InputGroup>
              <InputControl message={formErrors.name} isInvalid={!!formErrors.name}>
                <Input
                  isInvalid={!!formErrors.name}
                  type="text"
                  name="name"
                  value={form.name}
                  placeholder="Account Name"
                  onBlur={handleBlur}
                  onChange={handleInput}
                />
              </InputControl>
              <InputControl message={formErrors.currency} isInvalid={!!formErrors.currency}>
                <Select name="currency" onChange={handleInput} onBlur={handleBlur}>
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
        </Flex>
      </PageBody>
    </Page>
  );
};

export default AddAccount;
