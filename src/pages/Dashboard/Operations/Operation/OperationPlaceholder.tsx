import React from 'react';
import styled from 'styled-components';
import Table from '../../../../components/Table';

const OperationPlaceholder = () => {
  return (
    <Table.Foot>
      <Table.Row>
        <Table.Cell>
          <CheckBox disabled />
        </Table.Cell>
        <Table.Cell>
          <CellPlaceholder />
        </Table.Cell>
        <Table.Cell>
          <CellPlaceholder />
        </Table.Cell>
        <Table.Cell>
          <CellPlaceholder />
        </Table.Cell>
        <Table.Cell>
          <CellPlaceholder />
        </Table.Cell>
      </Table.Row>
    </Table.Foot>
  );
};

const CellPlaceholder = styled.div`
  display: flex;
  height: 40px;
  background: linear-gradient(0deg, #f4f4f4, #f4f4f4), linear-gradient(0deg, #f4f4f4, #f4f4f4),
    #f4f4f4;
`;

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  width: 23px;
  height: 23px;
  background: linear-gradient(0deg, #f4f4f4, #f4f4f4), linear-gradient(0deg, #f4f4f4, #f4f4f4),
    #f4f4f4;
`;

export default OperationPlaceholder;
