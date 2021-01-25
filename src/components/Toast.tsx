import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

const StyledToastContainer = styled(ToastContainer).attrs({
  className: 'toast-container',
  toastClassName: 'toast',
  bodyClassName: 'body',
  progressClassName: 'progress',
})`
  width: 400px;

  .toast {
    border-radius: 8px;
    padding: 10px;
  }

  .Toastify__toast--success {
    background-color: var(--button-primary-background-color);
    &:hover {
      background-color: var(--button-primary-background-color-hover);
    }
  }

  .Toastify__toast--success button[aria-label='close'] {
    padding: 8px;
    margin: auto 5px;
    border-radius: 50%;
    background-color: #fff;
    color: var(--button-primary-background-color);
  }

  .Toastify__toast--error {
    background-color: var(--button-danger-background-color);
    &:hover {
      background-color: var(--button-danger-background-color-hover);
    }
  }

  .Toastify__toast--error button[aria-label='close'] {
    padding: 8px;
    margin: 10px;
    border-radius: 50%;
    background-color: #fff;
    color: var(--button-danger-background-color);
  }

  .Toastify__toast--warning button[aria-label='close'] {
    padding: 8px;
    margin: 10px;
    border-radius: 50%;
    background-color: #fff;
    color: #f1c40f;
  }
`;

export default StyledToastContainer;
