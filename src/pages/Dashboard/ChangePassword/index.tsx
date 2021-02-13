import React from 'react';
import Header from '../../../components/Header';
import Flex from '../../../components/Flex';
import { Page, PageHeader, PageBody } from '../style/SubPages.style';
import { useUser } from '../../../hooks/useUser';

const ChangePassword = () => {
  const { data, loading, error } = useUser();

  return (
    <Page>
      <PageHeader>
        <Header margin="auto" as="h3">
          Change Password
        </Header>
      </PageHeader>
      <PageBody>
        <Flex justifyContent="center"></Flex>
      </PageBody>
    </Page>
  );
};

export default ChangePassword;
