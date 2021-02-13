import React from 'react';
import styled from 'styled-components';

import Text from './Text';

export const Control = styled.div`
  margin-bottom: 20px;

  ${Text} {
    margin-top: 3px;
  }
`;

type Props = {
  message?: string;
  isInvalid?: boolean;
  children: React.ReactNode;
};

const InputControl = ({ message, isInvalid, children }: Props) => {
  return (
    <Control>
      {children}
      {!!message && (
        <Text align="left" variation={isInvalid ? 'danger' : 'default'}>
          {message}
        </Text>
      )}
    </Control>
  );
};

export default InputControl;
