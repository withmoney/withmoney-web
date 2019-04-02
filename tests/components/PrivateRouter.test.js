import React from 'react';
import renderer from 'react-test-renderer';
import PrivateRouter from 'components/PrivateRouter';

jest.mock('react-router-dom', () => ({
  Route: 'route',
  Redirect: 'redirect',
}));

describe('PrivateRouter', () => {
  let Component;

  beforeAll(() => {
    Component = global.setup(PrivateRouter);
  });

  it('should render a component correctly', () => {
    const children = <div>children</div>;
    const wrapper = renderer.create(
      Component({
        component: children,
      }),
    );

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
