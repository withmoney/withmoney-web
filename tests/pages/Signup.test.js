import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import Signup from 'pages/Signup';
import * as UserApi from 'api/User';

const mockStore = configureStore([thunk]);

jest.mock('api/User', () => ({
  signup: jest.fn().mockResolvedValue({
    data: {
      success: true,
    },
  }),
}));

describe('Signup', () => {
  let Component;

  beforeAll(() => {
    Component = global.withReduxAndRouter(mockStore({}), Signup);
  });

  it('should render a component correctly', () => {
    const wrapper = renderer.create(Component());

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should call onSabe action when signup form is submitted', () => {
    const wrapper = mount(Component());

    wrapper
      .find('input[name="name"]')
      .simulate('change', { target: { name: 'name', value: 'David Costa' } });
    wrapper
      .find('input[name="email"]')
      .simulate('change', { target: { name: 'email', value: 'davidcostadev@gmail.com' } });
    wrapper
      .find('input[name="password"]')
      .simulate('change', { target: { name: 'password', value: '123456' } });
    wrapper
      .find('input[name="passwordConfirm"]')
      .simulate('change', { target: { name: 'passwordConfirm', value: '123456' } });

    wrapper.find('form').simulate('submit');

    expect(UserApi.signup).toBeCalledWith({
      name: 'David Costa',
      email: 'davidcostadev@gmail.com',
      password: '123456',
      passwordConfirm: '123456',
    });
  });
});
