import React, { useEffect, ChangeEvent } from 'react';
import CHECK_HASH from './mutations/CheckHash';
import { useUrlQuery } from '../hooks/UseURLQuery';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import Link from '../components/Link';
import Page from '../components/Page';
import Header from '../components/Header';
import Form from '../components/Form';

const RegistrationVerify = () => {
  const hash = useUrlQuery();
  const [verifyHash, { error }] = useMutation(CHECK_HASH);

  useEffect(() => {
    const verify = async () => {
      if (hash) {
        try {
          await verifyHash({ variables: hash });
        } catch (err) {}
      }
    };
    verify();
  }, []);

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
          {error ? (
            <Header style={{ fontSize: '18px' }} variation="danger" align="center">
              {error.message}
            </Header>
          ) : (
            <>
              <Header style={{ fontSize: '18px' }} variation="primary" align="center">
                Your email was confirmed
              </Header>
              <Link href="/" variation="primary">
                You first login now!
              </Link>
            </>
          )}
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
