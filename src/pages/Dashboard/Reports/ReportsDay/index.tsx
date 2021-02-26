import React from 'react';
import capitalize from 'lodash/capitalize';
import { PageHeader, Page, PageBody, Content } from 'pages/Dashboard/style/SubPages.style';
import { useOperationsFilters } from 'hooks/useOperationsFilters';
import Header from 'components/Header';
import Text from 'components/Text';
import { languageValue } from 'constants/Langs';
import { ReportButton } from 'pages/Dashboard/Reports/style';
import { useUser } from 'hooks/useUser';

const ReportsDay = () => {
  const { data } = useUser();
  const { currentDateTime } = useOperationsFilters();

  return (
    <Page>
      <PageHeader>
        <Content>
          <Header bold as="h3" style={{ margin: '0 8px' }}>
            Reports:
          </Header>
          {data && (
            <Text font="xl" as="h3">
              {capitalize(currentDateTime?.setLocale(languageValue[data.me.language]).monthLong)}
            </Text>
          )}
        </Content>
        <Content>
          <ReportButton to="/reports">By Category</ReportButton>
          <ReportButton variation="primary" to="/reports-day">
            By Day
          </ReportButton>
          <ReportButton to="/reports-month">By Month</ReportButton>
        </Content>
      </PageHeader>
      <PageBody></PageBody>
    </Page>
  );
};

export default ReportsDay;
