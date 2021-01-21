import styled from 'styled-components';

type Props = {
  margin?: string;
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
  position: absolute;
  margin: ${({ margin = '0' }) => margin};
  animation: var(--spinner-animation-time) linear infinite spinner;
  border: solid 5px var(--spinner-border-color);
  border-bottom-color: var(--spinner-border-bottom-color);
  border-radius: var(--spinner-border-radius);
  height: var(--spinner-size);
  width: var(--spinner-size);
`;

export default LoadingSpinner;
