import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Wrapper from './Wrapper';
import ContentPage from './Operations/ContentPage';
import { GET_OPERATIONS } from '../../graphql/AuthGql';
import { useDateTime } from '../../hooks/useMonthNavigation';

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const { currentDateTime } = useDateTime();

  const { data, loading } = useQuery(GET_OPERATIONS, {
    variables: {
      initDate: currentDateTime?.startOf('month'),
      endDate: currentDateTime?.endOf('month'),
    },
  });

  useEffect(() => {
    const getOperations = () => {
      const operations = data.me.operations;
      const getBalance = operations.reduce((initValue: number, currentValue: any) => {
        if (currentValue.type === 'Deposit') {
          return initValue + currentValue.value;
        } else {
          return initValue - currentValue.value;
        }
      }, 0);
      return getBalance;
    };

    if (data) {
      setBalance(getOperations());
    }
  }, [data]);

  return (
    <DashboardContainer>
      <Wrapper>
        <NavBar isLoading={loading} />
        <Content>
          <SideBar balance={balance} />
          <ContentPage />
        </Content>
      </Wrapper>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  margin-top: 15px;
  position: relative;
`;

export default Dashboard;
