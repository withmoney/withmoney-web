import React from 'react';
import styled from 'styled-components';
import Table from '../Components/Table';
import CheckBox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { currencyFormat } from '../../../utils/currency';
import { LANG, CURRENCY } from '../../../constants/currency';

const data = [
  {
    id: 1,
    isPaid: false,
    date: '26/12',
    name: 'João Borges Santos',
    category: 'Food',
    price: 12.0,
  },
  {
    id: 2,
    isPaid: false,
    date: '26/12',
    name: 'João Borges Santos',
    category: 'Food',
    price: 12.0,
  },
  {
    id: 3,
    isPaid: false,
    date: '26/12',
    name: 'João Borges Santos',
    category: 'Food',
    price: 15.0,
  },
];

const EntranceData = () => {
  return (
    <Table.Body>
      {!!data.length &&
        data.map((operation) => {
          return (
            <Table.Row key={operation.id}>
              <Table.Cell>
                <CheckBox readOnly checked={operation.isPaid} />
              </Table.Cell>
              <Table.Cell>
                <InputOperations readOnly value={operation.date} />
              </Table.Cell>
              <Table.Cell>
                <InputOperations readOnly value={operation.name} />
              </Table.Cell>
              <Table.Cell>
                <InputOperations readOnly value={operation.category} />
              </Table.Cell>
              <Table.Cell>
                <InputOperations readOnly value={currencyFormat(LANG, CURRENCY, operation.price)} />
              </Table.Cell>
              <Table.Cell>
                <Button variation="danger">Delete</Button>
              </Table.Cell>
            </Table.Row>
          );
        })}
    </Table.Body>
  );
};

const InputOperations = styled(Input)`
  height: 40px;
`;

export default EntranceData;
