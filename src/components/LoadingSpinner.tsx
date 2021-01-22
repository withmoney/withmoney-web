import styled from 'styled-components';

type Props = {
  margin?: string;
  position?: 'absolute' | 'fixed' | 'relative';
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
  size?: string;
};

const LoadingSpinner = styled.div<Props>`
  @keyframes spinner {
    0% {
      transform: translateX(15px) translate3d(-50%, -50%, 0);
    }
    100% {
      transform: translateX(15px) translate3d(-50%, -50%, 0) rotate(360deg);
    }
  }
  position: ${({ position = 'absolute' }) => position};
  margin: ${({ margin = '0' }) => margin};
  animation: var(--spinner-animation-time) linear infinite spinner;
  border: solid 5px var(--spinner-border-color);
  border-bottom-color: var(--spinner-border-bottom-color);
  border-radius: var(--spinner-border-radius);
  height: ${({ size }) => (size ? `${size}` : 'var(--spinner-size)')};
  width: ${({ size }) => (size ? `${size}` : 'var(--spinner-size)')};
  top: ${({ top }) => (top ? top : null)};
  right: ${({ right }) => (right ? right : null)};
  left: ${({ left }) => (left ? left : null)};
  bottom: ${({ bottom }) => (bottom ? bottom : null)};
`;

export default LoadingSpinner;
