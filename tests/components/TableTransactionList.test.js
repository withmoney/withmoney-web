import renderer from 'react-test-renderer';
import TableTransactionList from 'components/TableTransactionList';

jest.mock('components/TableTransactionItem', () => 'table-transaction-item');

describe('TableTransactionList', () => {
  let Component;

  beforeAll(() => {
    Component = global.setup(TableTransactionList);
  });

  it('should render null when dont have any transaction', () => {
    const wrapper = renderer.create(Component());

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render spin when loading status is true', () => {
    const wrapper = renderer.create(
      Component({
        isLoading: true,
      }),
    );

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render table with list of transactions', () => {
    const wrapper = renderer.create(
      Component({
        list: [
          {
            id: 99,
            name: 'Name',
            transactionDate: '2018-08-01 20:80',
            CategoryId: 1,
            value: '10.00',
          },
        ],
      }),
    );

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
