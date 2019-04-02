import renderer from 'react-test-renderer';
import FieldInput from 'components/FieldInput';

describe('FieldInput', () => {
  let Component;

  beforeAll(() => {
    Component = global.setup(FieldInput);
  });

  it('should render a component correctly', () => {
    const wrapper = renderer.create(
      Component({
        id: 'input-id',
      }),
    );

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
