import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    /* fonts */
    --font-default: 16px;

    /* Text */
    --text-default-color: #363636;
    --text-primary-color: #219653;
    --text-light-color: #9AA0A9;
    --text-danger-color: #E98686;

    /* Button */
    --button-padding-height: 12px;
    --button-padding-width: 18px;

    --button-default-color: #363636;
    --button-primary-color: #FFFFFF;
    --button-light-color: #363636;
    --button-danger-color: #FFFFFF;

    --button-default-color-disabled: #9B9B9B;
    --button-primary-color-disabled: #FFFFFF;
    --button-light-color-disabled: #9B9B9B;
    --button-danger-color-disabled: #FFFFFF;

    --button-default-background-color: #FFFFFF;
    --button-primary-background-color: #219653;
    --button-light-background-color: #E7E7E7;
    --button-danger-background-color: #E98686;

    --button-default-background-color-hover: #FFFFFF;
    --button-primary-background-color-hover: #1C8147;
    --button-light-background-color-hover: #DADADA;
    --button-danger-background-color-hover: #E57070;

    --button-default-background-color-active: #FFFFFF;
    --button-primary-background-color-active: #1A7540;
    --button-light-background-color-active: #D3D3D3;
    --button-danger-background-color-active: #E36363;

    --button-default-background-color-focus: #FFFFFF;
    --button-primary-background-color-focus: #219653;
    --button-light-background-color-focus: #E7E7E7;
    --button-danger-background-color-focus: #E98686;

    --button-default-background-color-disabled: #FFFFFF;
    --button-primary-background-color-disabled: #90CBA9;
    --button-light-background-color-disabled: #E7E7E7;
    --button-danger-background-color-disabled: #F4C3C3;

    --button-default-border: #DBDBDB;
    --button-default-border-hover: #B5B5B5;
    --button-default-border-active: #4A4A4A;
    --button-default-border-focus: #3273DC;
    --button-default-border-disabled: #DBDBDB;
    --button-light-border-focus: #3273DC;

    --button-default-box-shadow-focus: rgba(50, 115, 220, 0.25);
    --button-primary-box-shadow-focus: rgba(33, 150, 83, 0.5);
    --button-light-box-shadow-focus: rgba(50, 115, 220, 0.25);
    --button-danger-box-shadow-focus: rgba(233, 134, 134, 0.5);
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
  h1 {
    color: #363636;
    font-size: 42px;
    line-height: 52px; 
  }
  h2 {
    color: #363636;
    font-size: 37px;
    line-height: 47px;
  }
  h3 {
    color: #363636;
    font-size: 32px;
    line-height: 42px;
  }
`;

export default GlobalStyle;
