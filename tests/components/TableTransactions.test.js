/* eslint-disable prefer-destructuring */
import React from 'react';
import renderer from 'react-test-renderer';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TableTransactions from '../../src/components/TableTransactions';
import * as Transactions from '../../src/api/Transactions';

const mockStore = configureStore([thunk]);

configure({ adapter: new Adapter() });

const setup = (Component, store) => (props = {}) => (
  <Provider store={store}>
    <Component {...props} />
  </Provider>
);

jest.mock('../../src/api/Transactions', () => ({
  list: jest.fn().mockResolvedValue(true),
}));

describe('TableTransactions', () => {
  let now;
  let Component;

  beforeAll(() => {
    Component = setup(TableTransactions, mockStore({}));
    now = Date.now;
    Date.now = () => 1548860400000;
  });

  afterAll(() => {
    Date.now = now;
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
            },
          ],
        },
      }),
    );

    const wrapper = renderer.create(ComponentWithData());

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should call fetch list on componentDidMount', () => {
    Date.now = () => 1532473578215;
    const wrapper = mount(Component());

    expect(Transactions.list).toBeCalledWith({
      batch: 'Categories',
      order: 'transactionDate.asc',
      transactionDate: '2018-07-01T00:00:00.000Z,2018-07-31T23:59:59.999Z',
      type: 'in',
    });

    wrapper.find('#tab-out').simulate('click');

    expect(Transactions.list).toBeCalledWith({
      batch: 'Categories',
      order: 'transactionDate.asc',
      transactionDate: '2018-07-01T00:00:00.000Z,2018-07-31T23:59:59.999Z',
      type: 'out',
    });

    wrapper.find('#tab-in').simulate('click');

    expect(Transactions.list).toBeCalledWith({
      batch: 'Categories',
      order: 'transactionDate.asc',
      transactionDate: '2018-07-01T00:00:00.000Z,2018-07-31T23:59:59.999Z',
      type: 'in',
    });
  });
});
