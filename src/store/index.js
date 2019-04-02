import { createStore } from 'redux';
import middleware from 'app/store/middleware';
import reducers from 'app/store/modules';

export default createStore(reducers, middleware);
