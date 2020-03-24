import React, { FormEvent, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Auth from '../services/auth';

const Page = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
`;

const Container = styled.div`
  padding-left: 15px;
  padding-right: 15px;
`;

const Brand = styled.h1`
  text-align: center;
  font-size: 42px;
  font-weight: 700;
  margin-top: 70px;
  margin-bottom: 45px;
`;

const Form = styled.form`
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  max-width: 445px;
  width: 100%;
  border-radius: 5px;
  padding: 20px 20px 30px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  flex-direction: column;
`;

const Field = styled.input`
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #bdbdbd;
  padding: 10px 12px;
  margin-bottom: 20px;
  outline: none;

  &:focus {
    box-shadow: 0 0 0px 2px rgba(33, 150, 83, 0.5);
  }
  &:disabled {
    color: gray;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  & + & {
    margin-top: 20px;
  }
`;

const Button = styled.button`
  background-color: #219653;
  color: white;
  font-size: 16px;
  border-width: 0px;
  padding: 11px 13px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #308856;
  }

  &:focus {
    box-shadow: 0 0 0px 2px rgba(33, 150, 83, 0.5);
  }

  &:active {
    background-color: #256a43;
  }

  &:disabled {
    background-color: hsla(146, 10%, 36%, 1);
  }
`;

const Link = styled.a`
  color: #219653;
  text-decoration: underline;

  &:hover {
    color: #308856;
  }
  &:active {
    color: #256a43;
  }
`;

interface AlertProps {
  isRed?: boolean;
}

const Alert = styled.div`
  background-color: ${(props: AlertProps) => (props.isRed ? '#963621' : '#214296')};
  color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
`;

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const { data } = await Auth.login(form);
      if (!data.success) {
        setError('Your email or password are invalid!');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  return (
    <Page>
      <Container>
        <Brand>withmoney</Brand>
        <Form onSubmit={onSubmit}>
          <Title>Signin</Title>
          {!!error && <Alert isRed>{error}</Alert>}
          <Field
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInput}
            disabled={isLoading}
            required
          />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
            disabled={isLoading}
            required
          />
          <Flex>
            <Link>Reset your password</Link>
            <Button disabled={isLoading}>{isLoading ? 'Sending...' : 'Login'}</Button>
          </Flex>
          <Flex>
            <span>Do you not have an account?</span>
            <Link>Signup</Link>
          </Flex>
        </Form>
      </Container>
    </Page>
  );
};

export default Login;
