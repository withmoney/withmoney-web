import React, { FormEvent, useState, ChangeEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import Page from '../components/Page';
import Alert from '../components/Alert';
import Header from '../components/Header';
import Form from '../components/Form';
import Flex from '../components/Flex';
import Link from '../components/Link';

export const USER_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [userLogin, { loading, error }] = useMutation(USER_LOGIN);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const {
        data: {
          login: { token },
        },
      } = await userLogin({
        variables: form,
      });

      localStorage.setItem('withmoney-token', token);
    } catch (err) {}
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <Page>
      <Container>
        <Header style={{ marginTop: '70px', marginBottom: '45px' }} as="h1" align="center">
          withmoney
        </Header>
        <Form onSubmit={onSubmit}>
          <Header style={{ marginBottom: '20px', marginTop: '25px' }} as="h3" align="center">
            Log in
          </Header>
          {error &&
            error.graphQLErrors.map(({ message }, index) => (
              <Alert key={index} isDanger>
                {message}
              </Alert>
            ))}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInput}
            disabled={loading}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
            disabled={loading}
            required
          />
          <Flex>
            <Link variation="primary">Reset your password</Link>
            <Button variation="primary" disabled={loading}>
              {loading ? 'Sending...' : 'Log in'}
            </Button>
          </Flex>
          <Flex>
            <span>Do you not have an account?</span>
            <Link variation="primary">Sign up</Link>
          </Flex>
        </Form>
      </Container>
    </Page>
  );
};

const Container = styled.div`
  padding-left: 15px;
  padding-right: 15px;
`;

export default Login;
