import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Button from '../components/Button';
import Input from '../components/Input';
import Page from '../components/Page';
import Header from '../components/Header';
import Form from '../components/Form';
import Flex from '../components/Flex';
import Link from '../components/Link';
import Alert from '../components/Alert';
import Container from '../components/Container';
import FormControl from '../components/FormControl';
import USER_REGISTER from './mutations/register';
import Text from '../components/Text';
import { userSchema } from './validations/useValidation';

const SingUp = () => {
  const [formIsValid, setFormIsValid] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false);
  const [userRegister, { loading, error }] = useMutation(USER_REGISTER);

  const [formErrors, setFormErrors] = useState({
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
      console.log(formErrors.firstName);
    }
    const isValid = await userSchema.isValid(form);
    setFormIsValid(!isValid);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (await userSchema.isValid(form)) {
      try {
        await userRegister({ variables: form });
        setSuccessMessage(true);
      } catch (err) {}
    }
  };

  return (
    <Page>
      <Container show={successMessage}>
        <Header style={{ marginTop: '70px', marginBottom: '45px' }} as="h1" align="center">
          withmoney
        </Header>

        <Form onSubmit={onSubmit} style={{ marginBottom: '80px' }}>
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
            <FormControl>
              <Input
                onBlur={handleBlur}
                type="text"
                name="firstName"
                placeholder="First Name *"
                onChange={handleInput}
                disabled={loading}
                style={{ width: '95%', marginRight: '10px' }}
              />
              {!!formErrors.firstName && (
                <Text style={{ margin: '5px 5px' }} align="left" variation="danger">
                  {formErrors.firstName}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <Input
                onBlur={handleBlur}
                type="text"
                name="lastName"
                placeholder="Last Name *"
                onChange={handleInput}
                disabled={loading}
                style={{ marginRight: '10px' }}
              />
              {!!formErrors.lastName && (
                <Text style={{ margin: '5px 5px' }} align="left" variation="danger">
                  {formErrors.lastName}
                </Text>
              )}
            </FormControl>
          </Flex>

          <FormControl>
            <Input
              onBlur={handleBlur}
              type="email"
              name="email"
              placeholder="Email *"
              disabled={loading}
              onChange={handleInput}
              style={{ marginBottom: '0' }}
            />
            {!!formErrors.email && (
              <Text style={{ margin: '5px 5px' }} align="left" variation="danger">
                {formErrors.email}
              </Text>
            )}
          </FormControl>

          <FormControl>
            <Input
              onBlur={handleBlur}
              type="password"
              name="password"
              placeholder="Password *"
              onChange={handleInput}
              disabled={loading}
              style={{ marginRight: '20px' }}
            />
            {!!formErrors.password && (
              <Text style={{ margin: '5px 5px' }} align="left" variation="danger">
                {formErrors.password}
              </Text>
            )}
          </FormControl>

          <FormControl>
            <Input
              onBlur={handleBlur}
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password *"
              onChange={handleInput}
              disabled={loading}
              style={{ marginBottom: '0px', marginRight: '20px' }}
            />
            {!!formErrors.passwordConfirm && (
              <Text style={{ margin: '5px 5px' }} align="left" variation="danger">
                {formErrors.passwordConfirm}
              </Text>
            )}
          </FormControl>

          <Flex>
            <Button disabled={formIsValid} style={{ margin: 'auto' }} variation="primary">
              {loading ? 'Sending...' : 'Register'}
            </Button>
          </Flex>

          <Flex>
            <Text>Do you already have an account?</Text>
            <Link href="/" variation="primary">
              Sign up
            </Link>
          </Flex>
        </Form>
      </Container>

      <Container show={!successMessage}>
        <Header style={{ marginTop: '70px', marginBottom: '45px' }} as="h1" align="center">
          withmoney
        </Header>

        <Form>
          <Header style={{ marginBottom: '20px', marginTop: '25px' }} as="h3" align="center">
            Registration done
          </Header>

          <Alert show={successMessage}>
            Your registration was doing with success, please confirm your email address, check your
            inbox!
          </Alert>
        </Form>
      </Container>
    </Page>
  );
};

export default SingUp;
