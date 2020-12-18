import styled from 'styled-components';

import Flex, { Props as FlexProps } from './Flex';
import { Control } from './InputControl';

const InputGroup = styled(Flex)<FlexProps>`
  ${Control} + ${Control} {
    margin-left: 15px;
  }
`;

export default InputGroup;
