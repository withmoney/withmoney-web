import styled from 'styled-components';

interface Props {
  isDanger?: boolean;
  width?: string;
}

const Alert = styled.div<Props>`
  width: ${({ width }) => (width ? width : null)};
  background-color: ${({ isDanger }) =>
    isDanger ? 'var(--alert-danger-background-color)' : 'var(--alert-primary-background-color)'};
  color: white;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
  text-align: 'center';
`;

export default Alert;
