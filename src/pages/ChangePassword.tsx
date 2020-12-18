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
  const [formErrors, setFormError] = useState(initialValues);
  const [formIsValid, setFormIsValid] = useState(false);
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPassword({ ...password, [name]: value.trim() });
  };

  const handleBlur = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    try {
      await checkPassword.validateAt(event.target.name, password);
      setFormError({ ...formErrors, [name]: '' });
    } catch (err) {
      setFormError({ ...formErrors, [name]: err.errors });
    }
    const isValid = await checkPassword.isValid(password);
    setFormIsValid(isValid);
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
          <InputControl message={formErrors.password} isInvalid={!!formErrors.password}>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              disabled={loading}
              onBlur={handleBlur}
              onChange={handleInput}
            />
          </InputControl>

          <InputControl
            message={formErrors.passwordConfirm}
            isInvalid={!!formErrors.passwordConfirm}
          >
            <Input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm password"
              disabled={loading}
              onBlur={handleBlur}
              onChange={handleInput}
            />
          </InputControl>

          <Flex justifyContent="center">
            <Button disabled={!formIsValid} variation="primary">
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </Flex>
        </Form>
      </Container>
    </Page>
  );
};

export default ChangePassword;
