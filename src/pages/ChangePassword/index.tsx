import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { checkEmailSchema } from 'schema/auth';
import { REQUEST_CHANGE_PASSWORD } from 'graphql/AuthGql';
import Button from 'components/Button';
import Input from 'components/Input';
import Page from 'components/Page';
import Header from 'components/Header';
import Form from 'components/Form';
import Flex from 'components/Flex';
import Link from 'components/Link';
import Container from 'components/Container';
import InputControl from 'components/InputControl';
import Text from 'components/Text';

const ChangePassword = () => {
  const [form, setForm] = useState({ email: '' });
  const [formErrors, setFormErrors] = useState({ error: '' });
  const [formValidate, setFormValidate] = useState(false);
  const [requestChangePassword, { loading }] = useMutation(REQUEST_CHANGE_PASSWORD);
  const history = useHistory();

  useEffect(() => {
    const checkForm = async () => {
      setFormValidate(await checkEmailSchema.isValid(form));
    };
    checkForm();
  }, [form]);

  const handleInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setForm({ email: value.trim() });
  };

  const handleBlur = async () => {
    try {
      await checkEmailSchema.validate(form);
      setFormErrors({ error: '' });
    } catch (err) {
      setFormErrors({ error: err.message });
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await checkEmailSchema.validate(form)) {
      try {
        await requestChangePassword({ variables: form });
        toast.success('You will receive an email you are registered!');
        history.push('/signin');
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <Page>
      <Container>
        <Header as="h1" align="center">
          withmoney
        </Header>
        <Form onSubmit={onSubmit}>
          <Header as="h3" align="center">
            Reset password
          </Header>
          <InputControl message={formErrors.error} isInvalid={!!formErrors.error}>
            <Input
              isInvalid={!!formErrors.error}
              type="email"
              name="email"
              placeholder="Email"
              disabled={loading}
              onBlur={handleBlur}
              onChange={handleInput}
            />
          </InputControl>

          <Flex justifyContent="center">
            <Button disabled={!formValidate || loading} variation="primary">
              {loading ? 'Resetting...' : 'Reset'}
            </Button>
          </Flex>

          <Flex justifyContent="space-between">
            <Text>Did you remembered?</Text>

            <Link to="/signin" variation="primary">
              Sign in
            </Link>
          </Flex>
        </Form>
      </Container>
    </Page>
  );
};

export default ChangePassword;
