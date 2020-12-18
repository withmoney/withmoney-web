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

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const SingUp = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [form, setForm] = useState(initialValues);

  const [userRegister, { loading, error }] = useMutation(USER_REGISTER);

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
      setFormErrors({ ...formErrors, [name]: '' });
    } catch (err) {
      setFormErrors({ ...formErrors, [name]: err.errors });
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
      } catch (err) {
        toast.error(`${err.name}: ${err.message}`);
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
            Sign up
          </Header>

          <InputGroup>
            <InputControl message={formErrors.firstName} isInvalid={!!formErrors.firstName}>
              <Input
                type="text"
                name="firstName"
                placeholder="First Name *"
                disabled={loading}
                isInvalid={!!formErrors.firstName}
                onChange={handleInput}
                onBlur={handleBlur}
              />
            </InputControl>

            <InputControl message={formErrors.lastName} isInvalid={!!formErrors.firstName}>
              <Input
                isInvalid={!!formErrors.lastName}
                onBlur={handleBlur}
                type="text"
                name="lastName"
                placeholder="Last Name *"
                disabled={loading}
                onChange={handleInput}
              />
            </InputControl>
          </InputGroup>

          <InputControl message={formErrors.email} isInvalid={!!formErrors.email}>
            <Input
              type="email"
              name="email"
              placeholder="Email *"
              disabled={loading}
              isInvalid={!!formErrors.email}
              onChange={handleInput}
              onBlur={handleBlur}
            />
          </InputControl>

          <InputControl message={formErrors.password} isInvalid={!!formErrors.password}>
            <Input
              type="password"
              name="password"
              placeholder="Password *"
              disabled={loading}
              isInvalid={!!formErrors.password}
              onChange={handleInput}
              onBlur={handleBlur}
            />
          </InputControl>

          <InputControl
            message={formErrors.passwordConfirm}
            isInvalid={!!formErrors.passwordConfirm}
          >
            <Input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password *"
              disabled={loading}
              isInvalid={!!formErrors.passwordConfirm}
              onChange={handleInput}
              onBlur={handleBlur}
            />
          </InputControl>

          <Flex justifyContent="center">
            <Button disabled={!formIsValid} variation="primary">
              {loading ? 'Registering...' : 'Register'}
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
