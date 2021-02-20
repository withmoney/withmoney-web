import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { USER_LOGIN } from 'src/graphql/AuthGql';
import { Login } from 'src/pages';

const mocks = [
  {
    request: {
      query: USER_LOGIN,
      variables: {
        email: 'davidcostadev@gmail.com',
        password: 'password',
      },
    },
    result: {
      data: {
        login: {
          token: 'asdf',
        },
      },
    },
  },
];

describe('Login page', () => {
  it('Should return login form correctly', () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <Login />
      </MockedProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
