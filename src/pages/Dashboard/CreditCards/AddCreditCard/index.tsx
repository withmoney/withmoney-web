import React from 'react';
import Header from '../../../../components/Header';
import { PageHeader, Page, PageBody } from '../../style/SubPages.style';

const AddCreditCard = () => {
  return (
    <Page>
      <PageHeader>
        <Header margin="auto" as="h3">
          Add Credit Card
        </Header>
      </PageHeader>
      <PageBody></PageBody>
    </Page>
  );
};

export default AddCreditCard;
