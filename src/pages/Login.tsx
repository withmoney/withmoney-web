import React from 'react';
import styled from 'styled-components';

const Page = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
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
`;

const Link = styled.a`
  color: #219653;
`;

const Login = () => {
  return (
    <Page>
      <Brand>withmoney</Brand>
      <Form>
        <Title>Signin</Title>
        <Field type="email" placeholder="Email" />
        <Field type="password" placeholder="Password" />
        <Flex>
          <Link>Reset your password</Link>
          <Button>Login</Button>
        </Flex>
        <Flex>
          <span>Do you not have an account?</span>
          <Link>Signup</Link>
        </Flex>
      </Form>
    </Page>
  );
};

export default Login;
