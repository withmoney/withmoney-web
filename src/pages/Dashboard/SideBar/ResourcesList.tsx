import React from 'react';
import styled from 'styled-components';
import Text from '../../../components/Text';
import { AttachMoney as IconMoney, MoneyOff as IconMoneyOff } from '@styled-icons/material';

const ResourcesList = () => {
  return (
    <ResourcesListContainer>
      <Resource active>
        <Money />
        <Text>Transition</Text>
      </Resource>
      <Resource>
        <MoneyOff />
        <Text>Reports</Text>
      </Resource>
    </ResourcesListContainer>
  );
};

const Money = styled(IconMoney)`
  width: 30px;
  margin-right: 10px;
`;

const MoneyOff = styled(IconMoneyOff)`
  width: 30px;
  margin-right: 10px;
`;

const ResourcesListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  background-color: #ffff;
  padding-top: 20px;
`;

type ResourceProps = {
  active?: boolean;
};

const Resource = styled.div<ResourceProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ active }) => (active ? ' #E7E7E7' : '#ffff')};
  width: 300px;
  height: 45px;
  padding: 0 20px;
`;

export default ResourcesList;
