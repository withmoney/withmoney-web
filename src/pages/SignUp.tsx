import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';

import { userSchema } from '../schema/registration';
import { USER_REGISTER } from '../graphql/AuthGql';
import Button from '../components/Button';
import Input from '../components/Input';
import Page from '../components/Page';
import Header from '../components/Header';
import Form from '../components/Form';
import Flex from '../components/Flex';
import Link from '../components/Link';
import Container from '../components/Container';
import Text from '../components/Text';
import InputGroup from '../components/InputGroup';
import InputControl from '../components/InputControl';

const SingUp = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [userRegister, { loading, error }] = useMutation(USER_REGISTER);

  const [initialValue, setInitialValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  useEffect(() => {
    error?.graphQLErrors.map(({ message }) => {
      toast.error(message);
    });
  }, [error]);

  const handleInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value.trim(),
    });
  };

  const handleBlur = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    try {
      await userSchema.validateAt(event.target.name, form);
      setInitialValue({ ...initialValue, [name]: '' });
    } catch (err) {
      setInitialValue({ ...initialValue, [name]: err.errors });
    }
    const isValid = await userSchema.isValid(form);
    setFormIsValid(isValid);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (await userSchema.isValid(form)) {
      try {
        await userRegister({ variables: form });
        toast.success(
          'Your registration was doing with success, please confirm your email address, check your inbox',
        );
      } catch (err) {}
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
            Sign up
          </Header>

          <InputGroup>
            <InputControl>
              <Input
                isInvalid={!!initialValue.firstName}
                onBlur={handleBlur}
                type="text"
                name="firstName"
                placeholder="First Name *"
                onChange={handleInput}
                disabled={loading}
              />
              {!!initialValue.firstName && (
                <Text align="left" variation="danger">
                  {initialValue.firstName}
                </Text>
              )}
            </InputControl>

            <InputControl>
              <Input
                isInvalid={!!initialValue.lastName}
                onBlur={handleBlur}
                type="text"
                name="lastName"
                placeholder="Last Name *"
                onChange={handleInput}
                disabled={loading}
              />
              {!!initialValue.lastName && (
                <Text align="left" variation="danger">
                  {initialValue.lastName}
                </Text>
              )}
            </InputControl>
          </InputGroup>

          <InputControl>
            <Input
              isInvalid={!!initialValue.email}
              onBlur={handleBlur}
              type="email"
              name="email"
              placeholder="Email *"
              disabled={loading}
              onChange={handleInput}
            />
            {!!initialValue.email && (
              <Text align="left" variation="danger">
                {initialValue.email}
              </Text>
            )}
          </InputControl>

          <InputControl>
            <Input
              isInvalid={!!initialValue.password}
              onBlur={handleBlur}
              type="password"
              name="password"
              placeholder="Password *"
              onChange={handleInput}
              disabled={loading}
            />
            {!!initialValue.password && (
              <Text align="left" variation="danger">
                {initialValue.password}
              </Text>
            )}
          </InputControl>

          <InputControl>
            <Input
              isInvalid={!!initialValue.passwordConfirm}
              onBlur={handleBlur}
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password *"
              onChange={handleInput}
              disabled={loading}
            />
            {!!initialValue.passwordConfirm && (
              <Text align="left" variation="danger">
                {initialValue.passwordConfirm}
              </Text>
            )}
          </InputControl>

          <Flex justifyContent="center">
            <Button disabled={!formIsValid} variation="primary">
              {loading ? 'Registering' : 'Register'}
            </Button>
          </Flex>

          <Flex justifyContent="space-between">
            <Text>Do you already have an account?</Text>
            <Link to="/signin" variation="primary">
              Sign up
            </Link>
          </Flex>
        </Form>
      </Container>
    </Page>
  );
};

export default SingUp;
