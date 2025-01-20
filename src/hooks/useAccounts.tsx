import { useQuery, useMutation } from '@apollo/client';
import { DELETE_ACCOUNT } from 'graphql-service/gqls/Accounts';
import { RESTORE_ACCOUNT, GET_ONE_ACCOUNT } from 'graphql-service/gqls/Accounts';
import { CREATE_ACCOUNT, UPDATE_ACCOUNT } from 'graphql-service/gqls/Accounts';
import useNProgress from './useNProgress';
import { GetAccountsDocument } from 'graphql-service/hooks';

//getOneAccount
export function useUniqueAccounts(id: string) {
  return useQuery(GET_ONE_ACCOUNT, { variables: { id } });
}
//create
export const useCreateAccount = () => {
  const [createAccount, { data, loading, error }] = useMutation(CREATE_ACCOUNT, {
    refetchQueries: [{ query: GetAccountsDocument }],
  });

  useNProgress(loading);

  return { createAccount, data, loading, error };
};
//update
export const useUpdateAccount = () => {
  const [updateAccount, { data, loading, error }] = useMutation(UPDATE_ACCOUNT, {
    refetchQueries: [{ query: GetAccountsDocument }],
  });

  useNProgress(loading);

  return { updateAccount, data, loading, error };
};
//delete
export const useDeleteAccount = () => {
  const [deleteAccount, { data, loading, error }] = useMutation(DELETE_ACCOUNT, {
    refetchQueries: [{ query: GetAccountsDocument }],
  });

  useNProgress(loading);

  return { deleteAccount, data, loading, error };
};
//restore
export const useRestoreAccount = () => {
  const [restoreAccount, { data, loading, error }] = useMutation(RESTORE_ACCOUNT, {
    refetchQueries: [{ query: GetAccountsDocument }],
  });

  useNProgress(loading);

  return { restoreAccount, data, loading, error };
};
