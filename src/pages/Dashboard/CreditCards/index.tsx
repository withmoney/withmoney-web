import React from 'react';
import Header from '../../../components/Header';
import { Page, PageHeader, PageBody } from '../style/SubPages.style';
import ButtonLink from '../../../components/ButtonLink';

const CreditCards = () => {
  return (
    <Page>
      <PageHeader>
        <Header margin="0" as="h3">
          Credit Cards
        </Header>
        <ButtonLink type="button" to="/credit-card-new" variation="primary">
          Add new
        </ButtonLink>
      </PageHeader>
      <PageBody></PageBody>
    </Page>
  );
};

export default CreditCards;
