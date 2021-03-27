import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CHECK_HASH } from 'graphql/AuthGql';
import { useUrlQuery } from 'hooks/UseURLQuery';
import Link from 'components/Link';
import Page from 'components/Page';
import Header from 'components/Header';
import Form from 'components/Form';
import Container from 'components/Container';
import LoadingSpinner from 'components/LoadingSpinner';
import Alert from 'components/Alert';
import Flex from 'components/Flex';

const RegistrationVerify = () => {
  const urlQuery = useUrlQuery();
  const [verifyHash, { data, loading, error }] = useMutation(CHECK_HASH);

  useEffect(() => {
    const verify = async () => {
      if (urlQuery) {
        await verifyHash({ variables: urlQuery });
      }
    };
    verify();
  }, []);

  return (
    <Page>
      <Container>
        <Header as="h1" align="center">
          withmoney
        </Header>
        <Form>
          <Header as="h3" align="center">
            Registration
          </Header>

          {data && (
            <>
              <Alert>Your email was confirmed</Alert>
              <Link to="/signin" variation="primary">
                You first login now!
              </Link>
            </>
          )}

          {loading && (
            <Flex justifyContent="center">
              <LoadingSpinner />
            </Flex>
          )}

          {error && (
            <>
              <Alert isDanger>{error.message}</Alert>
              <Link to="/signin" variation="danger">
                Back to login Page
              </Link>
            </>
          )}
        </Form>
      </Container>
    </Page>
  );
};

export default RegistrationVerify;
