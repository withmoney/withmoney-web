import React from 'react';
import styled from 'styled-components';

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
const Table = styled.table`
  margin-bottom: 25px;
`;

const Header = styled.thead``;
const Body = styled.tbody``;
const Foot = styled.tfoot``;
const Row = styled.tr`
  margin-bottom: 10px;
`;

const Cell = styled.th`
  padding-right: 15px;
  &:first-child {
    text-align: center;
  }
`;
export default { Table, Header, Body, Foot, Row, Cell, Config };
