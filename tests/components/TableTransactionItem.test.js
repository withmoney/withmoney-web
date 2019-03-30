import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import TableTransactionItem from '../../src/components/TableTransactionItem';
import * as Transactions from '../../src/api/Transactions';

const mockStore = configureStore([thunk]);

jest.mock('../../src/api/Transactions', () => ({
  put: jest.fn().mockResolvedValue({}),
}));

describe('TableTransactionItem', () => {
  let Component;

  beforeAll(() => {
    Component = global.withRedux(mockStore({}), TableTransactionItem);
  });

  it('should render a static row with transaction', () => {
    const wrapper = renderer.create(Component({
      transaction: {
        id: 55,
        transactionDate: '2019-05-31',
        name: 'Name',
        CategoryId: 4,
        value: '40.5',
        isLoading: false,
      },
    }));

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('Should edit transaction and quite when click on save button', (done) => {
    const wrapper = mount(Component({
      transaction: {
        id: 55,
        transactionDate: '2019-05-31',
        name: 'Name',
        CategoryId: 4,
        value: '40.5',
      },
    }));

    expect(wrapper.find('TransactionsItem').state().isEditing).toBe(false);

    wrapper.find('.table-transactions__row').simulate('doubleclick');

    expect(wrapper.find('TransactionsItem').state().isEditing).toBe(true);

    wrapper.find('input[name="name"]').simulate('change', { target: { name: 'name', value: 'Name New' } });

    wrapper.find('button').simulate('click');

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
