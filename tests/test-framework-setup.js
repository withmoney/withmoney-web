const React = require('react');
const { Provider } = require('react-redux');
const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = Component => (props = {}) => (
  <Component {...props} />
);

const withRedux = (store, Component) => (props = {}) => (
  <Provider store={store}>
    <Component {...props} />
  </Provider>
);

global.setup = setup;
global.withRedux = withRedux;
