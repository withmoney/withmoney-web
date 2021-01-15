import { useQuery } from '@apollo/react-hooks';
import { GET_ACCOUNTS } from '../graphql/Accounts';
import { Me } from '../models';

type Data = {
  me: Me;
};

export function useAccounts() {
  return useQuery<Data>(GET_ACCOUNTS);
}
