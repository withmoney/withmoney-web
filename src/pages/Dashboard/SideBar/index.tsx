import React from 'react';
import styled from 'styled-components';
import Balance from './Balance';
import Information from './Information';
import Menu from './Menu';
import { useHide } from '../../../hooks/useHide';

const SideBar = () => {
  const { hideSideBar } = useHide();
  return (
    <Container hide={hideSideBar}>
      <Balance />
      <Information />
      <Menu />
    </Container>
  );
};

type Props = {
  hide: boolean;
};

export const Container = styled.div<Props>`
  background-color: var(--dashboard-color-grey);
  margin-right: 15px;
  display: ${({ hide }) => (hide ? 'none' : 'block')};
`;

export default SideBar;
