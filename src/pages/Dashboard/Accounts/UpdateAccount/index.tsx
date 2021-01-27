import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
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
import { useAccounts } from '../../../../hooks/useAccounts';
import { useUpdateAccount } from '../../../../hooks/useAccounts';

const AddAccount = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { data } = useAccounts();
  const account = data?.me.accounts.find((account) => account.id === id);

  const [form, setForm] = useState({
    id: id,
    accountName: account?.name,
    accountCurrency: account?.currency,
  });

  const [formErrors, setFormErrors] = useState({ accountName: '', accountCurrency: '' });
  const [formValidate, setFormValidate] = useState(false);
  const { updateAccount } = useUpdateAccount();

  useEffect(() => {
    const checkForm = async () => {
      setFormValidate(await checkAddAccount.isValid(form));
    };
    checkForm();
  });

  const handleInput = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value.trim(),
    });
    console.log(form);
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

  const handleUpdateAccount = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      updateAccount({
        variables: {
          id: form.id,
          name: form.accountName,
          currency: form.accountCurrency,
        },
      });
      toast.success(`Account ${account?.name} was been updated to ${form.accountName}!`, {
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
          Update Account
        </Header>
      </PageHeader>
      <PageBody>
        <Flex>
          <Form onSubmit={handleUpdateAccount}>
            <InputGroup>
              <InputControl message={formErrors.accountName} isInvalid={!!formErrors.accountName}>
                <Input
                  isInvalid={!!formErrors.accountName}
                  type="text"
                  name="accountName"
                  defaultValue={account?.name}
                  placeholder="Account Name"
                  onBlur={handleBlur}
                  onChange={handleInput}
                ></Input>
              </InputControl>
              <InputControl
                message={formErrors.accountCurrency}
                isInvalid={!!formErrors.accountCurrency}
              >
                <Select
                  defaultValue={form?.accountCurrency}
                  name="accountCurrency"
                  onChange={handleInput}
                  onBlur={handleBlur}
                >
                  <option value="">Select you currency</option>
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
              Update Account
            </Button>
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
