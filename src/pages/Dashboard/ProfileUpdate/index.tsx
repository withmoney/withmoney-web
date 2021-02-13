import React from 'react';
import Header from '../../../components/Header';
import Flex from '../../../components/Flex';
import { Page, PageHeader, PageBody } from '../style/SubPages.style';
import { useUser } from '../../../hooks/useUser';

const ProfileUpdate = () => {
  const { data, loading, error } = useUser();

  return (
    <Page>
      <PageHeader>
        <Header margin="auto" as="h3">
          Update Profile
        </Header>
      </PageHeader>
      <PageBody>
        <Flex justifyContent="center"></Flex>
      </PageBody>
    </Page>
  );
};

export default ProfileUpdate;
