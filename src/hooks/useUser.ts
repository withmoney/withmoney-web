import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
// import jwt from 'jsonwebtoken';
// import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import { GET_ME } from '../graphql/AuthGql';
import { UPDATE_USER, CHANGE_USER_PASSWORD } from '../graphql/User';
import { languageValue, languageLabels } from '../constants/Langs';
import { User } from '../models';
import { Locale } from '../models';

type Data = {
  me: User;
};

const API = 'https://ui-avatars.com/api/?background=E7E7E7&color=363636&name=';

export const useUser = () => {
  // const token = localStorage.getItem('withmoney-token') || '';
  const { data, loading, error } = useQuery<Data>(GET_ME);
  const { i18n } = useTranslation();

  const getDefaultImage = () => {
    const AVATAR = API + `${data?.me.firstName}+${data?.me.lastName}`;
    return AVATAR;
  };

  useEffect(() => {
    if (data?.me?.language) {
      i18n.changeLanguage(languageValue[data.me.language]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // useEffect(() => {
  //   if (token) {
  //     // debugger;
  //     try {
  //       // const decoded = jwtDecode(token) as {
  //       //   userId: string;
  //       // };
  //       // const logged = !!data?.me?.id && data.me.id === decoded?.userId;
  //       if (logged) {
  //         setLogged(logged);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //       // localStorage.removeItem('withmoney-token');
  //     }
  //   }
  // }, [token, data?.me?.id]);

  if (loading) return { loading };

  const logged = !!data?.me.id;

  return { data, logged, loading, error, getDefaultImage };
};

export const useUpdateUser = () => {
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_ME }],
  });

  return { updateUser, data, loading, error };
};

export const useUserChangePassword = () => {
  const [changeUserPassword, { data, loading, error }] = useMutation(CHANGE_USER_PASSWORD, {
    refetchQueries: [{ query: GET_ME }],
  });

  return { changeUserPassword, data, loading, error };
};

export const useUserLanguage = (): { value: string | undefined; label: string | undefined } => {
  const { data } = useQuery<Data>(GET_ME);
  const [language, setLanguage] = useState<Locale>();

  useEffect(() => {
    if (!language && data?.me) {
      setLanguage(data.me.language);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (language) return { value: languageValue[language], label: languageLabels[language] };
  else return { value: undefined, label: undefined };
};
