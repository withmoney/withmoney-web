import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';

import { registerSchema } from '../../schema/auth';
import { USER_REGISTER } from '../../graphql/AuthGql';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Page from '../../components/Page';
import Header from '../../components/Header';
import Form from '../../components/Form';
import Flex from '../../components/Flex';
import Link from '../../components/Link';
import Container from '../../components/Container';
import Text from '../../components/Text';
import InputGroup from '../../components/InputGroup';
import InputControl from '../../components/InputControl';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const SignUp = () => {
  const [form, setForm] = useState(initialValues);
  const [formErrors, setFormState] = useState({ error: initialValues });
  const [formValidate, setFormValidate] = useState(false);
  const [userRegister, { loading }] = useMutation(USER_REGISTER);
  const history = useHistory();

  useEffect(() => {
    const checkFormValidate = async () => {
      setFormValidate(await registerSchema.isValid(form));
    };
    checkFormValidate();
  }, [form]);

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
      await registerSchema.validateAt(event.target.name, form);
      setFormState({ error: { ...formErrors.error, [name]: '' } });
    } catch (err) {
      setFormState({ error: { ...formErrors.error, [name]: err.message } });
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await registerSchema.isValid(form)) {
      try {
        await userRegister({ variables: form });
        toast.success(
          'Your registration was doing with success, please confirm your email address, check your inbox',
        );
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
            Sign up
          </Header>

          <InputGroup>
            <InputControl
              message={formErrors.error.firstName}
              isInvalid={!!formErrors.error.firstName}
            >
              <Input
                type="text"
                name="firstName"
                placeholder="First Name *"
                disabled={loading}
                isInvalid={!!formErrors.error.firstName}
                onChange={handleInput}
                onBlur={handleBlur}
              />
            </InputControl>

            <InputControl
              message={formErrors.error.lastName}
              isInvalid={!!formErrors.error.lastName}
            >
              <Input
                isInvalid={!!formErrors.error.lastName}
                onBlur={handleBlur}
                type="text"
                name="lastName"
                placeholder="Last Name *"
                disabled={loading}
                onChange={handleInput}
              />
            </InputControl>
          </InputGroup>

          <InputControl message={formErrors.error.email} isInvalid={!!formErrors.error.email}>
            <Input
              type="email"
              name="email"
              placeholder="Email *"
              disabled={loading}
              isInvalid={!!formErrors.error.email}
              onChange={handleInput}
              onBlur={handleBlur}
            />
          </InputControl>

          <InputControl message={formErrors.error.password} isInvalid={!!formErrors.error.password}>
            <Input
              type="password"
              name="password"
              placeholder="Password *"
              disabled={loading}
              isInvalid={!!formErrors.error.password}
              onChange={handleInput}
              onBlur={handleBlur}
            />
          </InputControl>

          <InputControl
            message={formErrors.error.passwordConfirm}
            isInvalid={!!formErrors.error.passwordConfirm}
          >
            <Input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password *"
              disabled={loading}
              isInvalid={!!formErrors.error.passwordConfirm}
              onChange={handleInput}
              onBlur={handleBlur}
            />
          </InputControl>

          <Flex justifyContent="center">
            <Button disabled={!formValidate || loading} variation="primary">
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </Flex>

          <Flex justifyContent="space-between">
            <Text>Do you already have an account?</Text>
            <Link to="/signin" variation="primary">
              Sign in
            </Link>
          </Flex>
        </Form>
      </Container>
    </Page>
  );
};

export default SignUp;
