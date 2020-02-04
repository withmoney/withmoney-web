import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 16px;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

const App = () => (
  <>
    <GlobalStyle />
    <div>
      <h1>Hello World</h1>
    </div>
  </>
);

ReactDOM.render(<App />, document.querySelector('[root-react]'));
