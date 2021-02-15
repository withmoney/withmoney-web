import { useQuery, useMutation } from '@apollo/react-hooks';
import jwt from 'jsonwebtoken';
import { GET_ME } from '../graphql/AuthGql';
import { UPDATE_USER } from '../graphql/User';
import { User } from '../models';

type Data = {
  me: User;
};

const API = 'https://ui-avatars.com/api/?background=E7E7E7&color=363636&name=';

export const useUser = () => {
  const token = localStorage.getItem('withmoney-token') || '';
  const { data, loading, error } = useQuery<Data>(GET_ME);

  const getDefaultImage = () => {
    const AVATAR = API + `${data?.me.firstName}+${data?.me.lastName}`;
    return AVATAR;
  };

  if (loading) return { loading };

  const decoded = jwt.decode(token) as {
    userId: string;
  };
  const logged = !!data?.me?.id && data.me.id === decoded?.userId;

  return { data, logged, loading, error, getDefaultImage };
};

export const useUpdateUser = () => {
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_ME }],
  });

  return { updateUser, data, loading, error };
};
