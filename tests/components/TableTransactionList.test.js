import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TableTransactionList from '../../src/components/TableTransactionList';

describe('TableTransactionList', () => {
  let Component;

  beforeAll(() => {
    Component = global.setup(TableTransactionList);
  });

  it('should render null when dont have any transaction', () => {
    const wrapper = renderer.create(Component());

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render table with list of transactions', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({});

    const wrapper = renderer.create(
      <Provider store={store}>
        {Component({
          list: [
            {
              id: 99,
              name: 'Name',
              transactionDate: '2018-08-01 20:80',
              CategoryId: 1,
              value: '0.00',
            },
          ],
        })}
      </Provider>,
    );

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
