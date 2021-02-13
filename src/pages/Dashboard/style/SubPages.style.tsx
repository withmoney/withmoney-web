import styled from 'styled-components';

export const PageHeader = styled.div`
  display: flex;
  padding: 18px 44px;
  background-color: #e4e4e4;
  justify-content: space-between;
`;

export const PageBody = styled.div`
  padding: 35px;
  padding-bottom: 0;
  background-color: #ffff;
`;

export const Page = styled.div`
  background-color: #fff;
  height: 100%;
`;

export const Row = styled.div`
  display: flex;
  height: 45px;
  padding: 13px;
  align-items: center;
  justify-content: space-between;
`;

type PropsCell = {
  align?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
};

export const Cell = styled.span<PropsCell>`
  display: flex;
  justify-content: ${({ align = 'center' }) => align};
  padding: ${({ align }) => (align ? '30px' : '0')};
  min-width: 150px;
  &:first-child {
    width: 100%;
    justify-content: start;
  }
`;

export const PageBodyColumns = styled.div`
  padding: 35px;
  background-color: #ffff;
  div:nth-child(even) {
    background-color: rgb(244, 244, 244);
  }
`;
