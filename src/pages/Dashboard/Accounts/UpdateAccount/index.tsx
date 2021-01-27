import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../../../components/Header';
import Form from '../../../../components/Form';
import Input from '../../../../components/Input';
import InputGroup from '../../../../components/InputGroup';
import InputControl from '../../../../components/InputControl';
import Button from '../../../../components/Button';
import Flex from '../../../../components/Flex';
import Select from '../../../../components/Select';
import Alert from '../../../../components/Alert';
import { checkAddAccount } from '../../../../schema/checkField';
import { currencies } from '../../../../constants/Currencies';
import { useUniqueAccounts } from '../../../../hooks/useAccounts';
import { useUpdateAccount } from '../../../../hooks/useAccounts';
import { PageHeader, Page, PageBody } from '../styles';
import LoadingSpinner from '../../../../components/LoadingSpinner';

type Account = {
  id: string;
  accountName: string;
  accountCurrency: string;
};
const initialValues = { id: '', accountName: '', accountCurrency: '' };

const UpdateAccount = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useUniqueAccounts(id);
  const [form, setForm] = useState<Account>(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formValidate, setFormValidate] = useState(false);
  const { updateAccount, loading: loadingUpdate } = useUpdateAccount();

  useEffect(() => {
    if (data) {
      setForm({
        id: id,
        accountName: data?.findUniqueAccount.name,
        accountCurrency: data?.findUniqueAccount.currency,
      });
    }
  }, [data]);

  useEffect(() => {
    const checkForm = async () => {
      setFormValidate(await checkAddAccount.isValid(form));
    };
    checkForm();
  }, [form]);

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
      await checkAddAccount.validateAt(name, form);
      setFormErrors({ ...formErrors, [name]: '' });
    } catch (err) {
      setFormErrors({ ...formErrors, [name]: err.message });
    }
  };

  const handleUpdateAccount = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateAccount({
        variables: {
          id: form.id,
          name: form.accountName,
          currency: form.accountCurrency,
        },
      });
      toast.success(
        `Account ${data.findUniqueAccount.name} was been updated to ${form.accountName}!`,
        {
          position: toast.POSITION.BOTTOM_LEFT,
        },
      );
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
        <Flex justifyContent="center">
          {loading && <LoadingSpinner />}
          {error && <Alert isDanger>{error.message}</Alert>}
          {data && (
            <Form onSubmit={handleUpdateAccount}>
              <InputGroup>
                <InputControl message={formErrors.accountName} isInvalid={!!formErrors.accountName}>
                  <Input
                    isInvalid={!!formErrors.accountName}
                    type="text"
                    name="accountName"
                    defaultValue={data?.findUniqueAccount.name}
                    placeholder="Account Name"
                    onBlur={handleBlur}
                    onChange={handleInput}
                  />
                </InputControl>
                <InputControl
                  message={formErrors.accountCurrency}
                  isInvalid={!!formErrors.accountCurrency}
                >
                  <Select
                    defaultValue={data?.findUniqueAccount.currency}
                    name="accountCurrency"
                    onChange={handleInput}
                    onBlur={handleBlur}
                  >
                    <option value="">Select your currency</option>
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
                {loadingUpdate ? <LoadingSpinner size="20px" /> : 'Update Account'}
              </Button>
            </Form>
          )}
        </Flex>
      </PageBody>
    </Page>
  );
};
export default UpdateAccount;
