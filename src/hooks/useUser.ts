import { useQuery } from '@apollo/react-hooks';
import jwt from 'jsonwebtoken';
import { GET_ME } from '../graphql/AuthGql';
import { Data } from '../models';

export const useUser = () => {
  const token = localStorage.getItem('withmoney-token') || '';
  const { data, loading } = useQuery<Data>(GET_ME);

  if (loading) return { loading };

  const decoded = jwt.decode(token) as {
    userId: string;
  };
  const logged = !!data?.me?.id && data.me.id === decoded?.userId;

  return { data, logged, loading };
};
