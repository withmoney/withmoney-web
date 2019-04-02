import renderer from 'react-test-renderer';
import InOutPercent from 'components/InOutPercent';

describe('InOutPercent', () => {
  let Component;

  beforeAll(() => {
    Component = global.setup(InOutPercent);
  });

  it('should render a component correctly', () => {
    const wrapper = renderer.create(Component());

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
