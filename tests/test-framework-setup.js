const React = require('react');
const { Provider } = require('react-redux');
const { MemoryRouter, Route } = require('react-router-dom');
const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (Component, defaultProps = {}) => (props = {}) => (
  <Component {...defaultProps} {...props} />
);

const withRedux = (store, Component, defaultProps = {}) => (props = {}) => (
  <Provider store={store}>
    <Component {...defaultProps} {...props} />
  </Provider>
);

const withRouter = Component => props => (
  <MemoryRouter>
    <Component {...props} />
  </MemoryRouter>
);

const withReduxAndRouter = (store, Component) => (props = {}) => (
  <MemoryRouter>
    <Provider store={store}>
      <Route render={othersProps => <Component {...othersProps} {...props} />} />
    </Provider>
  </MemoryRouter>
);

global.setup = setup;
global.withRedux = withRedux;
global.withRouter = withRouter;
global.withReduxAndRouter = withReduxAndRouter;
