import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
      /* Text */
        /* Color */
        --text-color-primary: #219653;
        --text-color-light: #9AA0A9;
        --text-color-danger: #E98686;
        --text-color-default: #363636;

      /* Button */
        /* Color */
          /* Button default color */
          --button-color-default: #363636;
          --button-color-primary: #FFFFFF;
          --button-color-light: #363636;
          --button-color-danger: #FFFFFF;
          /* Button disabled color */
          --button-color-disabled-default: #9B9B9B;
          --button-color-disabled-primary: #FFFFFF;
          --button-color-disabled-light: #9B9B9B;
          --button-color-disabled-danger: #FFFFFF;

        /* Background */
          /* Button default background-color */
          --button-background-color-default: #FFFFFF;
          --button-background-color-primary: #219653;
          --button-background-color-light: #E7E7E7;
          --button-background-color-danger: #E98686;
          /* Button hover background-color */
          --button-background-color-hover-default: #FFFFFF;
          --button-background-color-hover-primary: #1C8147;
          --button-background-color-hover-light: #DADADA;
          --button-background-color-hover-danger: #E57070;
          /* Button active background-color */
          --button-background-color-active-default: #FFFFFF;
          --button-background-color-active-primary: #1A7540;
          --button-background-color-active-light: #D3D3D3;
          --button-background-color-active-danger: #E36363;
          /* Button focus background-color */
          --button-background-color-focus-default: #FFFFFF;
          --button-background-color-focus-primary: #219653;
          --button-background-color-focus-light: #E7E7E7;
          --button-background-color-focus-danger: #E98686;
          /* Button disabled background-color */
          --button-background-color-disabled-default: #FFFFFF;
          --button-background-color-disabled-primary: #90CBA9;
          --button-background-color-disabled-light: #E7E7E7;
          --button-background-color-disabled-danger: #F4C3C3;

        /* Border */
          /* Button border-color */
          --button-border-default: #DBDBDB;
          --button-border-primary: none;
          --button-border-light: none;
          --button-border-danger: none;
          /* Button border-hover */
          --button-border-hover-default: #B5B5B5;
          /* Button border-active */
          --button-border-active-default: #4A4A4A;
          /* Button border-focus */
          --button-border-focus-default: #3273DC;
          /* Button border-disabled */
          --button-border-disabled-default: #DBDBDB;

        /* box-shadow */
          /* Button box-shadow-focus */
          --button-box-shadow-focus-default: rgba(50, 115, 220, 0.25);
          --button-box-shadow-focus-primary: rgba(33, 150, 83, 0.5);
          --button-box-shadow-focus-light: rgba(50, 115, 220, 0.25);
          --button-box-shadow-focus-danger: rgba(233, 134, 134, 0.5);
    }

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

export default GlobalStyle;
