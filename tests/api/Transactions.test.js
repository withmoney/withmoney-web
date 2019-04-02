import fetch from 'api/fetch';
import * as Transactions from 'api/Transactions';

jest.mock('api/fetch', () => ({
  get: jest.fn().mockResolvedValue({ hello: 'world' }),
  put: jest.fn().mockResolvedValue({ hello: 'world' }),
}));

describe('Transactions Api', () => {
  it('should list return a mock data', async () => {
    const response = await Transactions.list();

    expect(response).toEqual({ hello: 'world' });

    expect(fetch.get).toBeCalledWith('transactions');
  });

  it('should get return a mock data', async () => {
    const response = await Transactions.get(99);

    expect(response).toEqual({ hello: 'world' });

    expect(fetch.get).toBeCalledWith('transactions/99');
  });

  it('should put return a mock data', async () => {
    const response = await Transactions.put(99, { one: 'two' });

    expect(response).toEqual({ hello: 'world' });

    expect(fetch.put).toBeCalledWith('transactions/99', { one: 'two' });
  });
});
