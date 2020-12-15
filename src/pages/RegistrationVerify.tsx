import React, { useState } from 'react';
import CHECK_HASH from './mutations/CheckHash';
import { useUrlQuery } from '../hooks/UseURLQuery';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import Button from '../components/Button';
import Page from '../components/Page';
import Header from '../components/Header';
import Form from '../components/Form';

const RegistrationVerify = () => {
  const [carregar, setCarregar] = useState(false);
  const hash = useUrlQuery();

  const [veryfyToken, { loading, error }] = useMutation(CHECK_HASH);

  return (
    <Page>
      <Container>
        <Header style={{ marginTop: '70px', marginBottom: '45px' }} as="h1" align="center">
          withmoney
        </Header>

        <Form>
          <Header style={{ marginBottom: '20px', marginTop: '25px' }} as="h3" align="center">
            Registration
          </Header>

          <Header style={{ fontSize: '18px' }} variation="primary" align="center">
            Registration success
          </Header>

          <Button variation="primary">Login</Button>
        </Form>
      </Container>
    </Page>
  );
};

const Container = styled.div`
  padding-left: 15px;
  padding-right: 15px;
`;

export default RegistrationVerify;
