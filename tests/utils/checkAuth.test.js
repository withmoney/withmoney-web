import localStorage from 'localStorage';
import checkAuth from '../../src/utils/checkAuth';

jest.mock('localStorage', () => ({
  getItem: jest.fn(),
}));

describe('utils', () => {
  it('checkAuth should return true', () => {
    localStorage.getItem.mockReturnValue(true);

    expect(checkAuth()).toBe(true);
  });

  it('checkAuth should return false', () => {
    localStorage.getItem.mockReturnValue(false);

    expect(checkAuth()).toBe(false);
  });
});
