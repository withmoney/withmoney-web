import renderer from 'react-test-renderer';
import FieldButton from 'components/FieldButton';

describe('FieldButton', () => {
  let Component;

  beforeAll(() => {
    Component = global.setup(FieldButton);
  });

  it('should render a component correctly', () => {
    const wrapper = renderer.create(
      Component({
        children: 'Text',
      }),
    );

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
