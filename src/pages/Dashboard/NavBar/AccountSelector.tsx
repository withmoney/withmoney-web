import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Select from '../../../components/Select';
import { useAccountFilters } from '../../../hooks/useAccountFilters';
import { GET_ACCOUNTS } from '../../../graphql/Accounts';
import { Me } from '../../../models';

type Data = {
  me: Me;
};

const AccountSelector = () => {
  const { data } = useQuery<Data>(GET_ACCOUNTS);
  const { setCurrentAccountId } = useAccountFilters();

  const accounts = data?.me.accounts || [];

  const SelectAccount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const account = event.target.value;
    setCurrentAccountId(account);
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
