import styled from 'styled-components';
import ButtonLink from 'components/ButtonLink';

export const Buttons = styled(ButtonLink)`
  width: 125px;
  border-radius: 0;
  outline: none;
  border: none;
  &:focus {
    border: none;
    box-shadow: none;
  }
`;
