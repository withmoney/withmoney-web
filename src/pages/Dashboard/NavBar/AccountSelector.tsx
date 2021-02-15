import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Select from '../../../components/Select';
import { useAccountFilters } from '../../../hooks/useAccountFilters';
import { GET_ACCOUNTS } from '../../../graphql/Accounts';
import { Account } from '../../../models';

type Data = {
  accounts: Account[];
};

const AccountSelector = () => {
  const { data } = useQuery<Data>(GET_ACCOUNTS, { fetchPolicy: 'network-only' });
  const { setCurrentAccount } = useAccountFilters();

  const accounts = data?.accounts || [];

  const SelectAccount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const accountId = event.target.value;
    const account = accounts.find((account) => account.id === accountId);
    if (account) {
      setCurrentAccount(account);
    }
  };

  return (
    <AccountContainer>
      <AccountTitle>current Account: </AccountTitle>
      <AccountSelect onChange={(event) => SelectAccount(event)}>
        {!!accounts.length &&
          accounts.map((account) => {
            return (
              <option key={account.id} value={account.id}>
                {account.name}
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
  width: 150px;
  padding: 5px 10px;
  margin-right: 12px;
`;

export default AccountSelector;
