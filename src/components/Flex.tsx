import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  & + & {
    margin-top: 20px;
  }
`;

export default Flex;
