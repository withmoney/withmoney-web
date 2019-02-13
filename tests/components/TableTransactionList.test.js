import React from 'react';
import renderer from 'react-test-renderer';
import TableTransactionList from '../../src/components/TableTransactionList';

const setup = Component => (props = {}) => (
  <Component {...props} />
);

describe('TableTransactionList', () => {
  let Component;

  beforeAll(() => {
    Component = setup(TableTransactionList);
  });

  it('should render null when dont have any transaction', () => {
    const wrapper = renderer.create(Component());

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render table with list of transactions', () => {
    const wrapper = renderer.create(Component({
      list: [
        {
          id: 99,
          name: 'Name',
          transactionDate: '2018-08-01 20:80',
          CategoryId: 1,
          value: '0.00',
        },
      ],
    }));

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});