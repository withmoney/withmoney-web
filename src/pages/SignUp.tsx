import React, { FormEvent, useState, ChangeEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import validator from 'validator';
import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import Page from '../components/Page';
import Header from '../components/Header';
import Form from '../components/Form';
import Flex from '../components/Flex';
import Link from '../components/Link';
import Alert from '../components/Alert';
import USER_REGISTER from './mutations/register';

const SingUp = () => {
  const [verifyError, setVerifyError] = useState([]);
  const [verifyFistName, setVerifyFistName] = useState(false);
  const [verifyLastName, setVerifyLastName] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState(false);
  const [successMessage, setSuccessMenssage] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  });

  const [userRegister, { loading, error }] = useMutation(USER_REGISTER);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value.replace(/[ ]/g, ''),
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMenssage(false);
    setVerifyFistName(false);
    setVerifyLastName(false);
    setVerifyEmail(false);
    setVerifyPassword(false);
    setVerifyError([]);
    const errors: any = [];

    let fistName = validator.isEmpty(form.firstName);
    let lastName = validator.isEmpty(form.lastName);
    let is_Email = validator.isEmail(form.email);
    let is_Password = validator.isEmpty(form.password);
    /*@ts-ignore */
    let isStroing = validator.isStrongPassword(form.password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 0,
      returnScore: false,
    });

    if (fistName) {
      setVerifyLastName(true);

      errors.push({ message: 'Please fill first name field!' });
    }
    if (lastName) {
      setVerifyEmail(true);
      errors.push({ message: 'Please fill last name field!' });
    }
    if (!is_Email) {
      setVerifyEmail(true);
      errors.push({ message: 'Invalid email!' });
    }

    if (is_Password) {
      setVerifyEmail(true);
      errors.push({ message: 'Please fill password field!' });
    }

    if (!isStroing) {
      setVerifyPassword(true);
      errors.push({ message: 'Your password is weak, use at least eight characters!' });
    }

    if (form.confirm !== form.password) {
      setVerifyPassword(true);
      errors.push({ message: 'The password is different!' });
    }

    if (errors.length > 0) {
      setVerifyError(errors);
      return;
    } else {
      try {
        await userRegister({
          variables: form,
        });
        setSuccessMenssage(true);
      } catch (err) {}
    }
  };

  return (
    <Page>
      <Container>
        <Header style={{ marginTop: '70px', marginBottom: '45px' }} as="h1" align="center">
          withmoney
        </Header>
        <Form onSubmit={onSubmit} style={{ marginBottom: '80px' }}>
          {verifyError.map(({ message }, index) => (
            <Alert show={true} key={index} isDanger>
              {message}
            </Alert>
          ))}
          {error &&
            error.graphQLErrors.map(({ message }, index) => (
              <Alert show={true} key={index} isDanger>
                {message}
              </Alert>
            ))}
          <Alert show={successMessage}>
            Your registration was doing with success, please confirm your email address, check your
            inbox
          </Alert>
          <Header style={{ marginBottom: '20px', marginTop: '25px' }} as="h3" align="center">
            Sign up
          </Header>
          <Flex>
            <Input
              type="text"
              name="firstName"
              placeholder="first name"
              onChange={handleInput}
              disabled={loading}
              style={{ width: '100%', marginRight: '10px' }}
              invalid={verifyFistName}
            />
            <Input
              type="text"
              name="lastName"
              placeholder="last name"
              onChange={handleInput}
              style={{ width: '100%', marginLeft: '10px' }}
              disabled={loading}
              invalid={verifyLastName}
              required
            />
          </Flex>
          <Input
            type="email"
            name="email"
            placeholder="email"
            disabled={loading}
            onChange={handleInput}
            invalid={verifyEmail}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleInput}
            disabled={loading}
            invalid={verifyPassword}
            required
          />
          <Input
            type="password"
            name="confirm"
            placeholder="confirm your password"
            onChange={handleInput}
            disabled={loading}
            invalid={verifyPassword}
            required
          />
          <Flex>
            <Button disabled={loading} style={{ margin: 'auto' }} variation="primary">
              {loading ? 'Sending...' : 'Register'}
            </Button>
          </Flex>
          <Flex>
            <span>Do you already have an account?</span>
            <Link href="/" variation="primary">
              Sign up
            </Link>
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

export default SingUp;
