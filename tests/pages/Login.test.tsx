import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Login, { USER_LOGIN } from '../../src/pages/Login';

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
