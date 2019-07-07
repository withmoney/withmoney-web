import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import TableTransactionItem from 'components/TableTransactionItem';
import * as Transactions from 'api/Transactions';

const mockStore = configureStore([thunk]);

jest.mock('api/Transactions', () => ({
  put: jest.fn().mockResolvedValue({}),
}));

describe('TableTransactionItem', () => {
  let Component;

  beforeAll(() => {
    const columns =  [
      { name: 'isPaid', label: 'Is Paid?', style: { flexBasis: '15%' }},
      { name: 'transactionDate', label: 'Date', style: { flexBasis: '15%' } },
      { name: 'name', label: 'Name', style: { flexBasis: '20%' } },
      { name: 'CategoryId', label: 'Category', style: { flexBasis: '20%' } },
      { name: 'value', label: 'Value', style: { flexBasis: '15%' } },
      { name: 'action', label: 'Action', style: { flexBasis: '15%' } },
    ];
    Component = global.withRedux(mockStore({}), TableTransactionItem, { columns });
  });

  it('should render a static row with transaction', () => {
    const wrapper = renderer.create(
      Component({
        transaction: {
          id: 55,
          transactionDate: '2019-05-31',
          name: 'Name',
          CategoryId: 4,
          value: '40.5',
          isLoading: false,
        },
      }),
    );

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('Should edit transaction and quite when click on save button', done => {
    const wrapper = mount(
      Component({
        transaction: {
          id: 55,
          transactionDate: '2019-05-31',
          name: 'Name',
          CategoryId: 4,
          value: '40.5',
        },
      }),
    );

    expect(wrapper.find('TransactionsItem').state().isEditing).toBe(false);

    wrapper.find('#transaction-55 .btn-edit').at(1).simulate('click');

    expect(wrapper.find('TransactionsItem').state().isEditing).toBe(true);

    wrapper
      .find('input[name="name"]')
      .simulate('change', { target: { name: 'name', value: 'Name New' } });

    wrapper.find('.btn-save').at(1).simulate('click');

    expect(Transactions.put).toBeCalledWith(55, {
      id: 55,
      transactionDate: '2019-05-31',
      name: 'Name New',
      CategoryId: 4,
      value: '40.5',
    });

    setImmediate(() => {
      expect(wrapper.find('TransactionsItem').state().isEditing).toBe(false);
      done();
    });
  });
});
