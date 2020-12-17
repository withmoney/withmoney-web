import styled from 'styled-components';

const LoadingSpinner = styled.div`
  @keyframes spinner {
    0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
  }
  :before {
    content: '';
    animation: var(--spinner-animation-time) linear infinite spinner;
    animation-play-state: inherit;
    border: solid 5px var(--spinner-border-color);
    border-bottom-color: var(--spinner-border-bottom-color);
    border-radius: var(--spinner-border-radius);
    height: var(--spinner-size);
    width: var(--spinner-size);
    position: absolute;
    top: var(--spinner-position-vertical);
    left: var(--spinner-position-horizontal);
    transform: var(--spinner-transform);
    will-change: transform;
  }
`;

export default LoadingSpinner;
