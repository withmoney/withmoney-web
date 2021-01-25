import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ACCOUNTS, DELETE_ACCOUNT, RESTORE_ACCOUNT, CREATE_ACCOUNT } from '../graphql/Accounts';
import { Data } from '../models';

export function useAccounts() {
  return useQuery<Data>(GET_ACCOUNTS);
}

export const useCreateAccount = () => {
  const [createAccount, { data, loading }] = useMutation(CREATE_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  return { createAccount, data, loading };
};

export const useDeleteAccount = () => {
  const [deleteAccount, { data, loading }] = useMutation(DELETE_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  return { deleteAccount, data, loading };
};

export const useRestoreAccount = () => {
  const [restoreAccount, { data, loading }] = useMutation(RESTORE_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  return { restoreAccount, data, loading };
};
