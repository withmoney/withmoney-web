import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from 'hooks/useUser';
import LoadingSpinner from './LoadingSpinner';
import Flex from './Flex';

type RoutesProps = {
  component: React.ElementType;
  path: string;
  exact?: boolean;
};

export const AuthenticatedRoute = ({ component: Component, ...rest }: RoutesProps) => {
  const { logged, loading } = useUser();

  let ComponentRender: React.ReactElement;

  if (loading) {
    ComponentRender = (
      <Flex isFullHeight justifyContent="center" alignItems="center">
        <LoadingSpinner />
      </Flex>
    );
  } else {
    ComponentRender = logged ? <Component {...rest} /> : <Redirect to={{ pathname: '/signin' }} />;
  }

  return <Route render={() => ComponentRender} />;
};

export const UnauthenticatedRoute = ({ component: Component, ...rest }: RoutesProps) => {
  const { logged, loading } = useUser();

  let ComponentRender: React.ReactElement;

  if (loading) {
    ComponentRender = (
      <Flex isFullHeight justifyContent="center" alignItems="center">
        <LoadingSpinner />
      </Flex>
    );
  } else {
    ComponentRender = logged ? (
      <Redirect to={{ pathname: '/dashboard' }} />
    ) : (
      <Component {...rest} />
    );
  }

  return <Route render={() => ComponentRender} />;
};
