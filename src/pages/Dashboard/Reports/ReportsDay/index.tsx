import React from 'react';
import capitalize from 'lodash/capitalize';
import groupBy from 'lodash/groupBy';
import { DateTime } from 'luxon';
import { PageHeader, Page, PageBody, Content } from 'pages/Dashboard/style/SubPages.style';
import { useOperationsFilters } from 'hooks/useOperationsFilters';
import Header from 'components/Header';
import Text from 'components/Text';
import SimpleLineChart from 'components/Graphs/SimpleLineChart';
import { languageValue } from 'constants/Langs';
import { ReportButton } from 'pages/Dashboard/Reports/style';
import { useUser } from 'hooks/useUser';
import { useOperations } from 'hooks/useOperations';
import { TransactionType } from 'models';

const ReportsDay = () => {
  const { data: dataUser } = useUser();
  const { currentDateTime } = useOperationsFilters();
  const { data: dataOperations, loading } = useOperations();

  if (loading || !currentDateTime) {
    return <div>Carregando...</div>;
  }

  const dataGrouped = groupBy(dataOperations?.operations ?? [], (a) => {
    return DateTime.fromISO(a?.paidAt).toFormat('dd');
  });

  let total = dataOperations?.balance?.amount ?? 0;

  const data = Array.from(Array(currentDateTime.endOf('month').day).keys()).map((number) => {
    const currentDay = currentDateTime.set({ day: number + 1 });
    const name = currentDay.toFormat('dd');

    let entradas = 0;
    let saidas = 0;

    if (dataGrouped[name]) {
      const operations = dataGrouped[name];

      entradas = operations
        .filter((a) => a.type === TransactionType.Deposit)
        .reduce((acc, cur) => acc + cur.value, 0);
      saidas = operations
        .filter((a) => a.type !== TransactionType.Deposit)
        .reduce((acc, cur) => acc + cur.value, 0);
    }

    total += entradas - saidas;

    return {
      name,
      total: total,
      entrada: entradas,
      saida: saidas,
    };
  });

  console.log(data);

  return (
    <Page>
      <PageHeader>
        <Content>
          <Header bold as="h3" style={{ margin: '0 8px' }}>
            Reports:
          </Header>
          {dataUser && (
            <Text font="xl" as="h3">
              {capitalize(
                currentDateTime?.setLocale(languageValue[dataUser.me.language]).monthLong,
              )}
            </Text>
          )}
        </Content>
        <Content>
          <ReportButton to="/reports">By Category</ReportButton>
          <ReportButton variation="primary" to="/reports-day">
            By Day
          </ReportButton>
          {/* <ReportButton to="/reports-month">By Month</ReportButton> */}
        </Content>
      </PageHeader>
      <PageBody>
        <SimpleLineChart data={data} />
      </PageBody>
    </Page>
  );
};

export default ReportsDay;
