import React from 'react';
import styled from 'styled-components';

type Props = {
  children?: React.ReactNode;
};

const Table = ({ children }: Props) => {
  return <table>{children}</table>;
};

const Config = () => {
  return (
    <colgroup>
      <col width="8%"></col>
      <col width="15%"></col>
      <col width="27%"></col>
      <col width="27%"></col>
      <col width="18%"></col>
      <col width="5%"></col>
    </colgroup>
  );
};

Table.Header = styled.thead``;
Table.Body = styled.tbody``;
Table.Foot = styled.tfoot``;
Table.Row = styled.tr`
  margin-bottom: 10px;
`;
Table.Cell = styled.td`
  font-weight: normal;
  text-align: start;
  padding-right: 15px;
  &:first-child {
    text-align: center;
  }
`;
Table.Config = Config;

export default Table;
