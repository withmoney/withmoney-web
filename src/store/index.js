import { createStore } from 'redux';
import middleware from './middleware';
import reducers from './modules';

export default createStore(reducers, middleware);
