import React from 'react';
import Header from '../../../components/Header';
import { Page, PageHeader } from './styles';

const Profile = () => {
  return (
    <Page>
      <PageHeader>
        <Header margin="auto" as="h3">
          Profile
        </Header>
      </PageHeader>
    </Page>
  );
};

export default Profile;
