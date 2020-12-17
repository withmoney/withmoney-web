import styled from 'styled-components';

import Flex, { Props as FlexProps } from './Flex';
import InputControl from './InputControl';

const InputGroup = styled(Flex)<FlexProps>`
  ${InputControl} + ${InputControl} {
    margin-left: 15px;
  }
`;

export default InputGroup;
