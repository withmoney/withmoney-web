import React from 'react';
import styled from 'styled-components';

export const TableConfig = () => {
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

export const Table = styled.table`
  margin-bottom: 25px;
`;

export const THeader = styled.thead``;
export const TBody = styled.tbody``;
export const TFoot = styled.tfoot``;
export const TR = styled.tr`
  margin-bottom: 10px;
`;

export const TH = styled.th`
  font-weight: normal;
  text-align: start;
  &:first-child {
    text-align: center;
  }
`;
export const TD = styled.td`
  padding-right: 15px;
  &:first-child {
    text-align: center;
  }
`;
