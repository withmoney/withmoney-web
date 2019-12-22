/* eslint-disable prefer-destructuring */
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedComponent, { TableTransactions } from 'components/TableTransactions';
import * as Transactions from 'api/Transactions';

const mockStore = configureStore([thunk]);

jest.mock('api/Transactions', () => ({
  list: jest.fn().mockResolvedValue({}),
  create: jest.fn(),
}));
jest.mock('components/TableTransactionList', () => 'table-transaction-list');

describe('TableTransactions', () => {
  let now;
  let Component;

  beforeAll(() => {
    Component = global.withRedux(mockStore({}), ConnectedComponent);
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
      data: [],
    });

    const ComponentWithData = global.withRedux(
      mockStore({
        transactions: {
          isLoading: false,
          data: [
            {
              id: 99,
              name: 'Name',
              transactionDate: '2018-08-01 20:80',
              CategoryId: 1,
              type: 'in',
              value: '10.00',
            },
            {
              id: 101,
              name: 'Name',
              transactionDate: '2018-08-01 20:80',
              CategoryId: 1,
              type: 'out',
              value: '20.00',
            },
          ],
        },
      }),
      ConnectedComponent,
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
    });

    wrapper.find('#tab-out').simulate('click');

    expect(Transactions.list).toBeCalledWith({
      batch: 'Categories',
      order: 'transactionDate.asc',
      transactionDate: '2018-07-01T00:00:00.000Z,2018-07-31T23:59:59.999Z',
    });

    wrapper.find('#tab-in').simulate('click');

    expect(Transactions.list).toBeCalledWith({
      batch: 'Categories',
      order: 'transactionDate.asc',
      transactionDate: '2018-07-01T00:00:00.000Z,2018-07-31T23:59:59.999Z',
    });
  });

  it('Should call fetch transaction.create on click add transaction button', () => {
    Date.now = () => 1532473578215;
    const defaultProps = {
      actions: {
        transaction: {
          put: jest.fn(),
          list: jest.fn(),
          create: jest.fn(),
        },
      },
    };
    const wrapper = mount(global.setup(TableTransactions, defaultProps)());

    wrapper.find('button#add-transaction').simulate('click');

    expect(defaultProps.actions.transaction.create).toBeCalledWith({
      transactionDate: '2018-07-24T23:06:18.215Z',
      type: 'in',
    });
    expect(defaultProps.actions.transaction.list).toBeCalledWith({
      batch: 'Categories',
      order: 'transactionDate.asc',
      transactionDate: '2018-07-01T00:00:00.000Z,2018-07-31T23:59:59.999Z',
    });
  });
});
