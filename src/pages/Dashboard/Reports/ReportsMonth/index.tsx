import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageHeader, Page, PageBody, Title } from 'pages/Dashboard/style/SubPages.style';
import { useOperationsFilters } from 'hooks/useOperationsFilters';
import { useUserLanguage } from 'hooks/useUser';
import Header from 'components/Header';
import Text from 'components/Text';
import { Buttons } from 'pages/Dashboard/Reports/index.style';

const Reports = () => {
  const { currentDateTime } = useOperationsFilters();
  const { value: language } = useUserLanguage();
  const [locale, changeLocale] = useState<string>('en-US');
  const month = currentDateTime?.setLocale(locale).monthLong;

  useEffect(() => {
    if (language) {
      changeLocale(language);
    }
  }, [language]);

  return (
    <Page>
      <PageHeader>
        <Title>
          <Header bold as="h3" style={{ margin: '0 8px' }}>
            Reports:
          </Header>
          <Text font="xl" as="h3">
            {month}
          </Text>
        </Title>
        <Title>
          <Buttons to="/reports">By Category</Buttons>
          <Buttons to="/reports-day">By Day</Buttons>
          <Buttons variation="primary" to="/reports-month">
            By Month
          </Buttons>
        </Title>
      </PageHeader>
      <PageBody></PageBody>
    </Page>
  );
};

export default Reports;
