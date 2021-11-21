import React, { useState } from 'react';
import styled from 'styled-components';
import capitalize from 'lodash/capitalize';
import { PageHeader, Page, PageBody, Content } from 'pages/Dashboard/style/SubPages.style';
import { useOperationsFilters } from 'hooks/useOperationsFilters';
import { Cell, Row } from 'pages/Dashboard/style/SubPages.style';
import Header from 'components/Header';
import Text from 'components/Text';
import Radio from 'components/Radio';
import PieGraph from 'components/Graphs/PieGraph';
import Flex from 'components/Flex';
import { filterCategories } from 'utils/FilterOperations';
import { currencyFormat } from 'utils/currency';
import { ReportButton, Label, Table } from 'pages/Dashboard/Reports/style';
import { useUser } from 'hooks/useUser';
import { useAccountFilters } from 'hooks/useAccountFilters';
import { languageValue } from 'constants/Langs';
import { useOperations } from 'hooks/useOperations';
import { useCategories } from 'hooks/useCategories';

const sumOperation = (accumulateValue: number, category: any) => {
  return accumulateValue + category.value;
};

const Reports = () => {
  const { data } = useUser();
  const { data: dataOperations } = useOperations();
  const { data: dataCategories } = useCategories();
  const { currentAccount } = useAccountFilters();
  const { currentDateTime } = useOperationsFilters();
  const [filterBy, setFilterBy] = useState<'incomes' | 'expenses'>('expenses');
  const categories = filterCategories(
    filterBy,
    dataCategories?.categories?.data,
    dataOperations?.operations,
  );

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
          <ReportButton variation="primary" to="/reports">
            By Category
          </ReportButton>
          <ReportButton to="/reports-day">By Day</ReportButton>
          {/*
          <ReportButton to="/reports-month">By Month</ReportButton>*/}
        </Content>
      </PageHeader>
      <PageBody>
        <Content>
          <Label>
            <Text>Filter by:</Text>
          </Label>
          <Label>
            <Radio
              onChange={() => setFilterBy('incomes')}
              checked={filterBy === 'incomes'}
              value="incomes"
              name="filter"
            />
            <Text>Incomes</Text>
          </Label>
          <Label>
            <Radio
              onChange={() => setFilterBy('expenses')}
              checked={filterBy === 'expenses'}
              value="expenses"
              name="filter"
            />
            <Text>Expenses</Text>
          </Label>
        </Content>
        <Flex>
          <GraphColumn>
            <PieGraph
              type={filterBy}
              operations={dataOperations?.operations}
              categories={dataCategories?.categories?.data}
            />
          </GraphColumn>
          <TableColumn>
            <Table>
              <Row>
                <Cell>
                  <Text>Category</Text>
                </Cell>
                <Cell align="flex-end">
                  <Text>Value</Text>
                </Cell>
              </Row>
              {categories &&
                currentAccount &&
                data &&
                categories.map((category) => (
                  <Row key={category.name}>
                    <Cell>
                      <Text>{category.name}</Text>
                    </Cell>
                    <Cell align="flex-end">
                      <Text>
                        {currencyFormat(
                          languageValue[data.me.language],
                          currentAccount.currency,
                          category.value,
                        )}
                      </Text>
                    </Cell>
                  </Row>
                ))}
              {categories && currentAccount && data && (
                <Row>
                  <Cell>
                    <Text bold>Total</Text>
                  </Cell>
                  <Cell align="flex-end">
                    <Text>
                      {currencyFormat(
                        languageValue[data?.me.language],
                        currentAccount?.currency,
                        categories.reduce(sumOperation, 0),
                      )}
                    </Text>
                  </Cell>
                </Row>
              )}
            </Table>
          </TableColumn>
        </Flex>
      </PageBody>
    </Page>
  );
};

const TableColumn = styled.div`
  width: 30%;
  max-width: 30%;
`;

const GraphColumn = styled.div`
  width: 70%;
  max-width: 70%;
  padding-right: 15px;
`;

export default Reports;
