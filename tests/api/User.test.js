import fetch from '../../src/api/fetch';
import * as User from '../../src/api/User';

jest.mock('../../src/api/fetch', () => ({
  post: jest.fn().mockResolvedValue({ hello: 'world' }),
}));

describe('User Api', () => {
  it('should return success when send login', async () => {
    const data = {
      email: 'davidcostadev@gmail.com',
      password: 'P@assw0rd',
    };

    const response = await User.login(data);

    expect(response).toEqual({ hello: 'world' });

    expect(fetch.post).toBeCalledWith('login', data);
  });

  it('should return success when send signup', async () => {
    const data = {
      name: 'David Costa',
      email: 'davidcostadev@gmail.com',
      password: 'P@assw0rd',
    };
    const response = await User.signup(data);

    expect(response).toEqual({ hello: 'world' });

    expect(fetch.post).toBeCalledWith('signup', data);
  });
});
