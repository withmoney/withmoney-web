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
  const [form, setForm] = useState({ email: '', password: '' });
  const [formState, setFormState] = useState({ error: initialValues, isValid: false });
  const [userLogin, { loading }] = useMutation(USER_LOGIN);
  const history = useHistory();

  useEffect(() => {
    const checkForm = async () => {
      try {
        const isValid = await loginSchema.isValid(form);
        setFormState({ error: { ...initialValues }, isValid: isValid });
      } catch (err) {
        setFormState({ error: { ...initialValues }, isValid: false });
      }
    };
    checkForm();
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
      await loginSchema.validateAt(name, form);
      const isValid = await loginSchema.isValid(form);
      setFormState({ error: { ...formState.error, [name]: '' }, isValid: isValid });
    } catch (err) {
      setFormState({ error: { ...formState.error, [name]: err.message }, isValid: false });
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

          <InputControl message={formState.error.email} isInvalid={!!formState.error.email}>
            <InputGroup>
              <Input
                isInvalid={!!formState.error.email}
                type="email"
                name="email"
                placeholder="Email"
                disabled={loading}
                onBlur={handleBlur}
                onChange={handleInput}
              />
            </InputGroup>
          </InputControl>

          <InputControl message={formState.error.password} isInvalid={!!formState.error.password}>
            <InputGroup>
              <Input
                isInvalid={!!formState.error.password}
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

            <Button variation="primary" disabled={!formState.isValid || loading}>
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
