import React from 'react';
import renderer from 'react-test-renderer';
import Spin from '../../src/components/Spin';

const setup = Component => (props = {}) => <Component {...props} />;

describe('Spin', () => {
  let Component;

  beforeAll(() => {
    Component = setup(Spin);
  });

  it('should render spin black', () => {
    const wrapper = renderer.create(Component());

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render spin white', () => {
    const wrapper = renderer.create(Component({ white: true }));

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
