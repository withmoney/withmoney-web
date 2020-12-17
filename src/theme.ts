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

    --font-default-margin-top: 0;
    --font-h1-margin-top: 70px;
    --font-h2-margin-top: 45px;
    --font-h3-margin-top: 20px;

    --font-default-margin-bottom: 0;
    --font-h1-margin-bottom: 45px;
    --font-h2-margin-bottom: 35px;
    --font-h3-margin-bottom: 25px;

    /* Text */
    --text-default-color: #363636;
    --text-primary-color: #219653;
    --text-light-color: #9AA0A9;
    --text-danger-color: #E98686;

    --text-default-color-hover: #636363;
    --text-primary-color-hover: #27a75e;
    --text-light-color-hover: #a6adb8;
    --text-danger-color-hover: #fb9c9c;

    --text-default-color-active: #272727;
    --text-primary-color-active: #1f854b;
    --text-light-color-active: #888e96;
    --text-danger-color-active: #d27474;

    /* Button */
    --button-padding-height: 12px;
    --button-padding-width: 18px;
    --button-rounded-padding: 22px;
    --button-icon-width: 16px;
    --button-icon-margin: 10px;
    --button-padding-horizontal: 13px;
    --button-padding-vertical: 13px;

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

    /* Textarea */
    --text-area-padding-vertical: 10px;
    --text-area-padding-horizontal: 12px;

    --text-area-color: #363636;
    --text-area-border-color: #BDBDBD;
    --text-area-border-color-hover: #B0B0B0;
    --text-area-border-color-focus: #3273dc;
    --text-area-border-color-active: #a9a9a9;
    --text-area-border-color-disabled: #dddddd;
    --text-area-border-color-placeholder: #bdbdbd;
    --text-area-background-color-disabled: #ececec;
    --text-area-box-shadow-focus: rgba(50, 115, 220, 0.25);

    /* Input */
    --input-border-radius: 5px;
    --input-padding-horizontal: 12px;
    --input-padding-vertical: 10px;
    --input-margin-bottom: 0;
    
    --input-disabled-color: #ececec;
    --input-border-color: #bdbdbd;
    --input-border-color-danger: #E98686;
    --input-border-color-hover: #B0B0B0;
    --input-border-color-active: #A9A9A9;
    --input-border-color-focus: #3273DC;
    --input-border-color-focus-danger: #dc3232;
    --input-border-color-disabled: #dddddd;
    --input-disabled-background-color: #ececec;
    --input-box-shadow: rgba(50, 115, 220, 0.25);
    --input-box-shadow-danger: rgba(220, 50, 50, 0.25);

    /* CheckBox */
    --check-box-size: 1rem;
    --check-box-position-icon-vertical: 24%;
    --check-box-position-icon-horizontal: 5%;
    --check-box-after-vertical: 54%;
    --check-box-after-horizontal: 37%;
    --check-box-after-transform: rotate(45deg);
    --check-box-border-radius: 0.25rem;

    --check-box-inactive-color: linear-gradient(0deg, #e7e7e7 0%, #feffff 100%);
    --check-box-color-hover: #ebebeb;
    --check-box-border-color: #dbdbdb;
    --check-box-border-color-after: #ffff;
    --check-box-background-color-disabled: #E7E7E7;
    --check-box-border-color-disabled: #dfe3e9;
    --check-box-border-color-disabled-after: #8e949d;

    /* Switch */
    --switch-vertical: 21px;
    --switch-horizontal: 38px;
    --switch-border-radius: 11px;
    --switch-border-radius-after: 50%;
    --switch-transition-background-border: 0.3s;
    --switch-transition-box-shadow: 0.2s;
    --switch-transition-opacity: 0.2s;
    --switch-transform-translateX: translateX(17px);
    --switch-position-after: 2px;
    --switch-position-after-ver-hor: 15px;

    --switch-border-color-inactive: #c4c4c4;
    --switch-border-color-inactive-hover: #929292;
    --switch-border-color-disabled: #e9edf1;
    --switch-border-color-disabled-after: #FFFFFF;
    --switch-border-color-disabled-inactive: #DBDBDB;
    --switch-border-color-disabled-checked: #9fa4ab;
    --switch-background-color-inactive: #FFFFFF;
    --switch-background-color-disabled: #dbdbdb;
    --switch-background-color-after: #DBDBDB;
    --switch-background-color-disabled-checked: #9fa4ab;

    /* Radio */
    --radio-size: 1rem;
    --radio-position-icon-left: 25%;
    --radio-position-icon-top: 25%;
    --radio-after-horizontal: 50%;
    --radio-after-vertical: 50%;
    --radio-border-radius: 50%;

    --radio-inactive-color: linear-gradient(0deg, #e7e7e7 0%, #feffff 100%);
    --radio-border-color: #dbdbdb;
    --radio-color-hover: #ebebeb;
    --radio-background-color-icon: #ffff;
    --radio-background-color-disabled: #e9edf1;
    --radio-background-color-disabled-after: #9FA4AB;
    --radio-border-color-disabled: #dfe3e9;

    /* Form */
    --form-background-color: #FFFFFF;

    /* Page */
    --page-background-color: #f2f2f2;

    /* Alert */
    --alert-primary-background-color: #219653;
    --alert-danger-background-color: #E98686;

    /* Spinner */
    --spinner-size: 40px;
    --spinner-position-vertical: 10%;
    --spinner-position-horizontal: 50%;
    --spinner-animation-time: 1.5s;
    --spinner-border-radius: 50%;
    --spinner-transform: translate3d(-50%, -50%, 0);
    

    --spinner-border-color: #cfd0d1;
    --spinner-border-bottom-color: #1c8147;
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
