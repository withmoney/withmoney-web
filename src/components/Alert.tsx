import styled from 'styled-components';

interface AlertProps {
  isDanger?: boolean;
}

const Alert = styled.div`
  background-color: ${(props: AlertProps) =>
    props.isDanger
      ? 'var(--alert-danger-background-color)'
      : 'var(--alert-primary-background-color:)'};
  color: white;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
`;

export default Alert;
