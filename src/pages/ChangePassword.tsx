import React, { FormEvent, useState, ChangeEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { useUrlQuery } from '../hooks/UseURLQuery';
import { checkPassword } from '../schema/registration';
import { CHANGE_PASSWORD } from '../graphql/AuthGql';
import Button from '../components/Button';
import Input from '../components/Input';
import Page from '../components/Page';
import Header from '../components/Header';
import Form from '../components/Form';
import Flex from '../components/Flex';
import Container from '../components/Container';
import InputControl from '../components/InputControl';

const initialValues = {
  password: '',
  passwordConfirm: '',
};

const ChangePassword = () => {
  const urlQuery = useUrlQuery();
  const [password, setPassword] = useState(initialValues);
  const [formState, setFormState] = useState({ error: initialValues, isValid: false });
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPassword({ ...password, [name]: value.trim() });
  };

  const handleBlur = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    try {
      await checkPassword.validateAt(event.target.name, password);
      const isValid = await checkPassword.isValid(password);
      setFormState({ error: initialValues, isValid: isValid });
    } catch (err) {
      setFormState({ error: { ...formState.error, [name]: err.message }, isValid: false });
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await checkPassword.isValid(password)) {
      try {
        await changePassword({ variables: { hash: urlQuery.hash, password: password.password } });
        toast.success('Your password is changed!');
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
            You new password
          </Header>
          <InputControl message={formState.error.password} isInvalid={!!formState.error.password}>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              disabled={loading}
              isInvalid={!!formState.error.password}
              onBlur={handleBlur}
              onChange={handleInput}
            />
          </InputControl>

          <InputControl
            message={formState.error.passwordConfirm}
            isInvalid={!!formState.error.passwordConfirm}
          >
            <Input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm password"
              disabled={loading}
              isInvalid={!!formState.error.passwordConfirm}
              onBlur={handleBlur}
              onChange={handleInput}
            />
          </InputControl>

          <Flex justifyContent="center">
            <Button disabled={!formState.isValid} variation="primary">
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </Flex>
        </Form>
      </Container>
    </Page>
  );
};

export default ChangePassword;