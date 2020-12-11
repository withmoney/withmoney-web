import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    /* fonts */
    --font-default: 16px;
    --font-h1: 42px;
    --font-h2: 37px;
    --font-h3: 32px;

    --font-default-weight: normal;
    --font-h1-weight: bold;
    --font-h2-weight: bold;
    --font-h3-weight: bold;

    --font-default-line-height: 16px;
    --font-h1-line-height: 52px;
    --font-h2-line-height: 47px;
    --font-h3-line-height: 42px;

    /* Text */
    --text-default-color: #363636;
    --text-primary-color: #219653;
    --text-light-color: #9AA0A9;
    --text-danger-color: #E98686;

    /* Button */
    --button-padding-height: 12px;
    --button-padding-width: 18px;
    --button-rounded-padding: 22px;
    --button-icon-width: 16px;
    --button-icon-margin: 10px;

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

    /* Input */
    --input-disabled-color: #ececec;
    --input-border-radius: 5px;
    --input-border-color: #bdbdbd;
    --input-border-color-hover: #B0B0B0;
    --input-border-color-active: #A9A9A9;
    --input-border-color-focus: #3273DC;
    --input-border-color-focus-danger: #dc3232;
    --input-border-color-disabled: #dddddd;
    --input-disabled-background-color: #ececec;
    --input-padding-horizontal: 12px;
    --input-padding-vertical: 10px;
    --input-margin-bottom: 20px;
    --input-box-shadow: rgba(50, 115, 220, 0.25);
    --input-box-shadow-danger: rgba(220, 50, 50, 0.25);
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
