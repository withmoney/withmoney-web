import React from 'react';
import styled from 'styled-components';
import Select from '../../../components/Select';

const data = [
  { key: '1', type: 'Personal' },
  { key: '2', type: 'Test' },
];

const AccountSelector = () => {
  return (
    <AccountContainer>
      <AccountTitle>current Account: </AccountTitle>
      <AccountSelect>
        {data &&
          data.map((account) => {
            return (
              <option key={account.key} value={account.type}>
                {account.type}
              </option>
            );
          })}
      </AccountSelect>
    </AccountContainer>
  );
};

const AccountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AccountTitle = styled.p`
  margin-right: 10px;
`;

const AccountSelect = styled(Select)`
  height: 40px;
  padding: 5px 10px;
  margin-right: 12px;
`;

export default AccountSelector;
