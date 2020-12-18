import React, { FormEvent, useState, ChangeEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { checkEmail } from '../schema/registration';
import { REQUEST_CHANGE_PASSWORD } from '../graphql/AuthGql';
import Button from '../components/Button';
import Input from '../components/Input';
import Page from '../components/Page';
import Header from '../components/Header';
import Form from '../components/Form';
import Flex from '../components/Flex';
import Link from '../components/Link';
import Container from '../components/Container';
import InputControl from '../components/InputControl';
import Text from '../components/Text';

const ResetPassword = () => {
  const [email, setEmail] = useState({ email: '' });
  const [formState, setFormState] = useState({ error: '', isValid: false });
  const [requestChangePassword, { loading }] = useMutation(REQUEST_CHANGE_PASSWORD);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail({ email: value });
  };

  const handleBlur = async () => {
    try {
      await checkEmail.validate(email);
      setFormState({ error: '', isValid: true });
    } catch (err) {
      setFormState({ error: err.message, isValid: false });
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await checkEmail.validate(email)) {
      try {
        await requestChangePassword({ variables: email });
        toast.success('You will receive an email you are registered!');
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
          <InputControl message={formState.error} isInvalid={!!formState.error}>
            <Input
              isInvalid={!!formState.error}
              type="email"
              name="email"
              placeholder="Email"
              disabled={loading}
              onBlur={handleBlur}
              onChange={handleInput}
            />
          </InputControl>

          <Flex justifyContent="center">
            <Button disabled={!formState.isValid} variation="primary">
              {loading ? 'Resetting...' : 'Reset'}
            </Button>
          </Flex>

          <Flex justifyContent="space-between">
            <Text>Did you remembered?</Text>

            <Link to="/signin" variation="primary">
              Sign up
            </Link>
          </Flex>
        </Form>
      </Container>
    </Page>
  );
};

export default ResetPassword;
