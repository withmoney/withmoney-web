import axios from 'axios';
import fetch from 'api/fetch';

jest.mock('axios', () => ({
  create: jest.fn().mockReturnValue({
    get: jest.fn().mockResolvedValue({ hello: 'world' }),
  }),
}));

describe('fetch', () => {
  it('should create a custom instance of actions', async () => {
    await fetch.get();

    expect(axios.create).toBeCalled();
  });
});
