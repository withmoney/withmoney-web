import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import Login from './pages/Login';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    font-size: 16px;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    color: #333333;
  }
`;

const App = () => (
  <>
    <GlobalStyle />
    <div>
      <Login />
    </div>
  </>
);

ReactDOM.render(<App />, document.querySelector('[root-react]'));
