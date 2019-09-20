import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import Login from '../../src/pages/Login';
import * as UserApi from '../../src/api/User';

const mockStore = configureStore([thunk]);

jest.mock('../../src/api/User', () => ({
  login: jest.fn(),
}));

describe('Login', () => {
  let Component;

  beforeAll(() => {
    Component = global.withReduxAndRouter(mockStore({}), Login);
  });

  it('should render a component correctly', () => {
    const wrapper = renderer.create(Component());

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should call onSabe action when login form is submitted', () => {
    const wrapper = mount(Component());

    UserApi.login.mockResolvedValue({
      data: {
        success: true,
      },
    });

    wrapper
      .find('input[name="email"]')
      .simulate('change', { target: { name: 'email', value: 'davidcostadev@gmail.com' } });
    wrapper
      .find('input[name="password"]')
      .simulate('change', { target: { name: 'password', value: '123456' } });

    wrapper.find('form').simulate('submit');

    expect(UserApi.login).toBeCalledWith({
      email: 'davidcostadev@gmail.com',
      password: '123456',
    });
  });

  it('Should return error', done => {
    const oldError = global.console.error;
    global.console.error = jest.fn();

    const wrapper = mount(Component());
    UserApi.login.mockRejectedValue({
      response: {
        data: {
          message: 'error',
        },
      },
    });

    wrapper.find('form').simulate('submit');
    wrapper.update();

    setImmediate(() => {
      expect(wrapper.find('Login').instance().state.message).toBe('error');
      done();

      global.console.error = oldError;
    });
  });
});
