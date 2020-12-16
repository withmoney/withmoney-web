import styled from 'styled-components';

interface Props {
  isDanger?: boolean;
  show?: boolean;
}

const Alert = styled.div<Props>`
  display: ${({ show }) => (show ? 'inline' : 'none')};
  background-color: ${({ isDanger }) =>
    isDanger ? 'var(--alert-danger-background-color)' : 'var(--alert-primary-background-color)'};
  color: white;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
`;

export default Alert;
