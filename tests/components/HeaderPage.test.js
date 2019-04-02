import renderer from 'react-test-renderer';
import HeaderPage from 'components/HeaderPage';

describe('HeaderPage', () => {
  let Component;

  beforeAll(() => {
    Component = global.setup(HeaderPage);
  });

  it('should render a component correctly', () => {
    const wrapper = renderer.create(Component());

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
