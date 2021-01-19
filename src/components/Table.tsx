import React from 'react';
import styled from 'styled-components';

type Props = {
  children?: React.ReactNode;
};

const Table = ({ children }: Props) => {
  return <TableStyled>{children}</TableStyled>;
};

Table.Header = styled.thead``;
Table.Body = styled.tbody``;
Table.Foot = styled.tfoot``;
Table.Row = styled.tr`
  margin-bottom: 10px;
`;

const TableStyled = styled.table`
  width: 100%;
  table-layout: fixed;
`;

type PropsCell = {
  width?: number;
};

Table.Cell = styled.td<PropsCell>`
  width: ${({ width }) => (width ? `${width}px` : null)};
  font-weight: normal;
  text-align: start;
  padding-right: 15px;
  &:first-child {
    text-align: center;
  }
`;

export default Table;
