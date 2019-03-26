import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import TableTransactionItem from '../../src/components/TableTransactionItem';
import * as TransactionsApi from '../../src/api/Transactions';

const setup = Component => (props = {}) => (
  <Component {...props} />
);

jest.mock('../../src/api/Transactions', () => ({
  put: jest.fn().mockResolvedValue({}),
}));

describe('TableTransactionItem', () => {
  let Component;

  beforeAll(() => {
    Component = setup(TableTransactionItem);
  });

  it('should render a static row with transaction', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({});
    const wrapper = renderer.create((
      <Provider store={store}>
        {Component({
          transaction: {
            id: 55,
            transactionDate: '2019-05-31',
            name: 'Name',
            CategoryId: 4,
            value: '40.5',
            isLoading: false,
          },
        })}
      </Provider>
    ));

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render table in mode edition', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({});

    const wrapper = mount((
      <Provider store={store}>
        {Component({
          transaction: {
            id: 99,
            name: 'Name',
            transactionDate: '2018-08-01 20:80',
            CategoryId: 1,
            value: '0.00',
          },
        })}
      </Provider>
    ));

    wrapper.find('.table-transactions__row').simulate('dblclick');

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call save with finish editing', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({});

    const wrapper = mount((
      <Provider store={store}>
        {Component({
          transaction: {
            id: 99,
            name: 'Name',
            transactionDate: '2018-08-01 20:80',
            CategoryId: 1,
            value: '0.00',
          },
        })}
      </Provider>
    ));

    wrapper.find('.table-transactions__row').simulate('dblclick');
    wrapper.find('input[name="name"]').simulate('change', { target: { name: 'name', value: 'Name new' } });
    wrapper.find('button').simulate('click');

    expect(TransactionsApi.put).toBeCalledWith(99, {
      CategoryId: 1, id: 99, name: 'Name new', transactionDate: '2018-08-01 20:80', value: '0.00',
    });
  });
});
