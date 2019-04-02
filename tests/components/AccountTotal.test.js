import renderer from 'react-test-renderer';
import AccountTotal from 'components/AccountTotal';

describe('AccountTotal', () => {
  let Component;

  beforeAll(() => {
    Component = global.setup(AccountTotal);
  });

  it('should render a component correctly', () => {
    const wrapper = renderer.create(Component());

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
