import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ACCOUNTS } from 'graphql/Accounts';
import { Account } from 'models';

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

  const { data } = useQuery<Data>(GET_ACCOUNTS);

  useEffect(() => {
    if (!currentAccount && data?.accounts?.length) {
      const currentAccountLS = localStorage.getItem('currentAccount');
      const account = data.accounts.find((account) => account.id === currentAccountLS);
      if (account) {
        setCurrentAccount(account);
      } else {
        setCurrentAccount(data?.accounts[0]);
      }
    }
  }, [data]);

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
