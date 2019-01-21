import fetch from '../../src/api/fetch';
import * as Transactions from '../../src/api/Transactions';

jest.mock('../../src/api/fetch', () => ({
  get: jest.fn().mockResolvedValue({ hello: 'world' }),
}));

describe('Transactions Api', () => {
  it('should list return a mock data', async () => {
    const response = await Transactions.list();

    expect(response).toEqual({ hello: 'world' });

    expect(fetch.get).toBeCalledWith('transactions');
  });


  it('should list return a mock data', async () => {
    const response = await Transactions.get(99);

    expect(response).toEqual({ hello: 'world' });

    expect(fetch.get).toBeCalledWith('transactions/99');
  });
});
