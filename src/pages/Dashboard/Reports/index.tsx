import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PageHeader, Page, PageBody, Content } from 'pages/Dashboard/style/SubPages.style';
import { PageBodyColumns, Row, Cell } from 'pages/Dashboard/style/SubPages.style';
import { useOperationsFilters } from 'hooks/useOperationsFilters';
import Header from 'components/Header';
import Text from 'components/Text';
import Flex from 'components/Flex';
import Radio from 'components/Radio';
import PieGraph from './PieGraph';
import { filterCategories } from 'utils/FilterOperations';
import { currencyFormat } from 'utils/currency';
import { Buttons } from 'pages/Dashboard/Reports/style';
import { useUser } from 'hooks/useUser';
import { useAccountFilters } from 'hooks/useAccountFilters';
import { languageValue } from 'constants/Langs';

const Reports = () => {
  const { data } = useUser();
  const { currentAccount } = useAccountFilters();
  const [filterBy, setFilterBy] = useState('Incomes');
  const [totalActions, setTotalActions] = useState(0);
  const categories = filterCategories(filterBy === 'Incomes');
  const { currentDateTime } = useOperationsFilters();
  const month = currentDateTime?.setLocale('en-US').monthLong;

  useEffect(() => {
    if (categories) {
      let total = 0;
      const value = categories.map((category) => {
        total += category.value;
      });
      setTotalActions(total);
    }
  }, [categories]);

  return (
    <Page>
      <PageHeader>
        <Content>
          <Header bold as="h3" style={{ margin: '0 8px' }}>
            Reports:
          </Header>
          <Text font="xl" as="h3">
            {month}
          </Text>
        </Content>
        <Content>
          <Buttons variation="primary" to="/reports">
            By Category
          </Buttons>
          <Buttons to="/reports-day">By Day</Buttons>
          <Buttons to="/reports-month">By Month</Buttons>
        </Content>
      </PageHeader>
      <PageBody>
        <Content>
          <Label>
            <Text>Filter By:</Text>
          </Label>
          <Label>
            <Radio
              onChange={() => setFilterBy('Incomes')}
              checked={filterBy === 'Incomes'}
              value="incomes"
              name="filter"
            />
            <Text>Incomes</Text>
          </Label>
          <Label>
            <Radio
              onChange={() => setFilterBy('Expenses')}
              checked={filterBy === 'Expenses'}
              value="expenses"
              name="filter"
            />
            <Text>Expenses</Text>
          </Label>
        </Content>
        <PieGraph incomes={filterBy === 'Incomes'} />
        <Table>
          <Row>
            <Cell>
              <Text>Name</Text>
            </Cell>
            <Cell align="flex-end">
              <Text>Actions</Text>
            </Cell>
          </Row>
          {categories &&
            currentAccount &&
            data &&
            categories.map((category) => {
              return (
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
              );
            })}
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
                    totalActions,
                  )}
                </Text>
              </Cell>
            </Row>
          )}
        </Table>
      </PageBody>
    </Page>
  );
};

const Table = styled(PageBodyColumns)`
  float: right;
  width: 48%;
  border: 2px solid #f2f2f2;
  padding: 0;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  ${Text} {
    padding: 8px;
  }

  ${Radio} {
    padding: 8px;
  }
`;

export default Reports;
