import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TableTransactions from '../../src/components/TableTransactions';
import * as Transactions from '../../src/api/Transactions';

const mockStore = configureStore([thunk]);

const setup = (Component, store) => (props = {}) => (
  <Provider store={store}>
    <Component {...props} />
  </Provider>
);

jest.mock('../../src/api/Transactions', () => ({
  list: jest.fn(),
}));

describe('TableTransactions', () => {
  let Component;

  beforeAll(() => {
    Component = setup(TableTransactions, mockStore({}));
  });

  it('should render with any one transaction entity', () => {
    Transactions.list.mockResolvedValueOnce({
      data: [],
    });

    const wrapper = renderer.create(Component());

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render table with list of transactions', () => {
    Transactions.list.mockResolvedValueOnce({
      data: [
        {
          id: 99,
          name: 'Name',
          transactionDate: '2018-08-01 20:80',
          CategoryId: 1,
          value: '0.00',
        },
      ],
    });

    const ComponentWithData = setup(
      TableTransactions,
      mockStore({
        transactions: {
          isLoading: false,
          data: [
            {
              id: 99,
              name: 'Name',
              transactionDate: '2018-08-01 20:80',
              CategoryId: 1,
              value: '0.00',
            }
          ],
        },
      }),
    );

    const wrapper = renderer.create(ComponentWithData());

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
