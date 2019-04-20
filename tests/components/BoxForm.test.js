import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import BoxForm from '../../src/components/BoxForm';

describe('BoxForm', () => {
  let Component;
  const defaultProps = {
    title: 'Title',
    subtitle: 'Subtitle',
    fields: <input name="input" />,
    footer: <button type="submit">Action</button>,
    onSubmit: jest.fn(),
  };

  beforeAll(() => {
    Component = global.setup(BoxForm, defaultProps);
  });

  it('should render a component correctly', () => {
    const wrapper = renderer.create(Component());

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should call action when form is submitted', () => {
    const wrapper = mount(Component());

    wrapper.find('form').simulate('submit');

    expect(defaultProps.onSubmit).toBeCalled();
  });
});
