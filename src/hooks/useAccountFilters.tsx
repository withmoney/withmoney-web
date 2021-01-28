import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ACCOUNTS } from '../graphql/Accounts';
import { Account } from '../models';

type Data = {
  accounts: Account[];
};

interface AccountFilterContext {
  currentAccount?: Account;
  setCurrentAccount: (account: Account) => void;
}

type Props = {
  children: React.ReactNode;
};

const AccountFilterContext = createContext<AccountFilterContext>({
  setCurrentAccount: () => {},
});

export default function AccountFiltersProvider({ children }: Props) {
  const [currentAccount, setCurrentAccount] = useState<Account | undefined>();

  const { data: accounts } = useQuery<Data>(GET_ACCOUNTS);

  useEffect(() => {
    if (!currentAccount && accounts?.accounts?.length) {
      setCurrentAccount(accounts?.accounts[0]);
    }
  }, [currentAccount, accounts]);

  return (
    <AccountFilterContext.Provider
      value={{
        currentAccount,
        setCurrentAccount,
      }}
    >
      {children}
    </AccountFilterContext.Provider>
  );
}

export function useAccountFilters() {
  const context = useContext(AccountFilterContext);
  const { currentAccount, setCurrentAccount } = context;
  return {
    currentAccount,
    setCurrentAccount,
  };
}
