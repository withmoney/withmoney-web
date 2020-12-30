import styled from 'styled-components';

type Props = {
  hide: boolean;
};

export const Container = styled.div<Props>`
  background-color: var(--dashboard-color-white);
  margin-right: 15px;
  display: ${({ hide }) => (hide ? 'none' : 'block')};
`;
