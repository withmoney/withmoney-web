import styled from 'styled-components';

type Props = {
  size?: string;
  inButton?: boolean;
};

const LoadingSpinner = styled.div<Props>`
  display: flex;
  @keyframes spinner {
    0% {
      transform: ${({ inButton }) => (inButton ? 'translateX(-7px)' : 'translateX(0)')};
    }
    100% {
      transform: ${({ inButton }) => (inButton ? 'translateX(-7px)' : 'translateX(0)')}
        rotate(360deg);
    }
  }
  animation: var(--spinner-animation-time) linear infinite spinner;
  border: solid 5px var(--spinner-border-color);
  border-bottom-color: var(--spinner-border-bottom-color);
  border-radius: var(--spinner-border-radius);
  height: ${({ size }) => (size ? `${size}` : 'var(--spinner-size)')};
  width: ${({ size }) => (size ? `${size}` : 'var(--spinner-size)')};
`;

export default LoadingSpinner;
