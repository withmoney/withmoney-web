import React from 'react';
import styled from 'styled-components';
import { Plus } from '@styled-icons/evaicons-solid';
import Button from '../../../components/Button';

const EntranceButton = () => {
  return (
    <ButtonContent>
      <Button rounded variation="light">
        <Plus />
        <span>Add Entrance</span>
      </Button>
    </ButtonContent>
  );
};

const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
`;

export default EntranceButton;
