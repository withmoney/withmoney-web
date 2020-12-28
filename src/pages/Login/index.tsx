import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { USER_LOGIN } from '../../graphql/AuthGql';
import { loginSchema } from '../../schema/auth';
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
  email: '',
  password: '',
};

const Login = () => {
  const [userLogin, { loading }] = useMutation(USER_LOGIN);
  const history = useHistory();

  const [form, setForm] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formValidate, setFormValidate] = useState(false);

  useEffect(() => {
    const checkForm = async () => {
      setFormValidate(await loginSchema.isValid(form));
    };
    checkForm();
  });

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
      await loginSchema.validateAt(name, form);
      setFormErrors(formErrors);
    } catch (err) {
      setFormErrors({ ...formErrors, [name]: err.message });
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await loginSchema.isValid(form)) {
      try {
        const {
          data: {
            login: { token },
          },
        } = await userLogin({
          variables: form,
        });

        localStorage.setItem('withmoney-token', token);
        history.push('/');
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
            Log in
          </Header>

          <InputControl message={formErrors.email} isInvalid={!!formErrors.email}>
            <InputGroup>
              <Input
                isInvalid={!!formErrors.email}
                type="email"
                name="email"
                placeholder="Email"
                disabled={loading}
                onBlur={handleBlur}
                onChange={handleInput}
              />
            </InputGroup>
          </InputControl>

          <InputControl message={formErrors.password} isInvalid={!!formErrors.password}>
            <InputGroup>
              <Input
                isInvalid={!!formErrors.password}
                type="password"
                name="password"
                placeholder="Password"
                disabled={loading}
                onChange={handleInput}
                onBlur={handleBlur}
              />
            </InputGroup>
          </InputControl>

          <Flex justifyContent="space-between">
            <Link to="/change-password" variation="primary">
              Reset your password
            </Link>

            <Button variation="primary" disabled={!formValidate || loading}>
              {loading ? 'Sending...' : 'Log in'}
            </Button>
          </Flex>

          <Flex justifyContent="space-between">
            <Text>Do you not have an account?</Text>
            <Link to="/signup" variation="primary">
              Sign up
            </Link>
          </Flex>
        </Form>
      </Container>
    </Page>
  );
};

export default Login;
