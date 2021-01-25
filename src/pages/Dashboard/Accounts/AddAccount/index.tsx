import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Header from '../../../../components/Header';
import Form from '../../../../components/Form';
import Input from '../../../../components/Input';
import InputControl from '../../../../components/InputControl';
import Button from '../../../../components/Button';
import Flex from '../../../../components/Flex';
import Select from '../../../../components/Select';
import { checkAddAccount } from '../../../../schema/checkField';
import { currencies } from '../../../../constants/Currencies';
import { useCreateAccount } from '../../../../hooks/useAccounts';

const initialValues = {
  accountName: '',
  accountCurrency: 'USD',
};

const AddAccount = () => {
  const [form, setAccountName] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formValidate, setFormValidate] = useState(false);
  const { createAccount } = useCreateAccount();
  const history = useHistory();

  useEffect(() => {
    const checkForm = async () => {
      setFormValidate(await checkAddAccount.isValid(form));
    };
    checkForm();
  });

  const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAccountName({
      ...form,
      [name]: value.trim(),
    });
  };

  const handleBlur = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    try {
      await checkAddAccount.validateAt(name, form);
      setFormErrors({ ...formErrors, [name]: '' });
    } catch (err) {
      setFormErrors({ ...formErrors, [name]: err.message });
    }
  };

  const handleCreateAccount = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      createAccount({ variables: { name: form.accountName, currency: form.accountCurrency } });
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
            <InputControl message={formErrors.accountName} isInvalid={!!formErrors.accountName}>
              <Flex alignItems="center" justifyContent="space-between">
                <Input
                  isInvalid={!!formErrors.accountName}
                  type="text"
                  name="accountName"
                  value={form.accountName}
                  placeholder="Account Name"
                  onBlur={handleBlur}
                  onChange={handleInput}
                ></Input>
                <Select
                  style={{ marginLeft: '10px' }}
                  onChange={(e) => setAccountName({ ...form, accountCurrency: e.target.value })}
                  defaultValue={form.accountCurrency}
                >
                  {currencies.map((currency) => {
                    return (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    );
                  })}
                </Select>
              </Flex>
            </InputControl>
            <Flex justifyContent="flex-end">
              <Button disabled={!formValidate} type="submit" variation="primary">
                Create
              </Button>
            </Flex>
          </Form>
        </Flex>
      </PageBody>
    </Page>
  );
};

const PageHeader = styled.div`
  display: flex;
  padding: 18px 44px;
  background-color: #e4e4e4;
  justify-content: space-between;
`;

const PageBody = styled.div`
  padding: 35px;
  background-color: #ffff;
`;

const Page = styled.div`
  background-color: #fff;
  height: 100%;
`;

export default AddAccount;
