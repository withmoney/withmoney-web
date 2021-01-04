import React from 'react';
import styled from 'styled-components';
import { TBody, TR, TD } from '../Components/Table';
import CheckBox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const data = [
  {
    id: 1,
    isPaid: false,
    date: '26/12',
    name: 'João Borges Santos',
    category: 'Food',
    price: 'R$ 12,00',
  },
  {
    id: 2,
    isPaid: false,
    date: '26/12',
    name: 'João Borges Santos',
    category: 'Food',
    price: 'R$ 12,00',
  },
  {
    id: 3,
    isPaid: false,
    date: '26/12',
    name: 'João Borges Santos',
    category: 'Food',
    price: 'R$ 12,00',
  },
];

const EntranceData = () => {
  return (
    <TBody>
      {data &&
        data.map((operation) => {
          return (
            <TR key={operation.id}>
              <TD>
                <CheckBox checked={operation.isPaid} />
              </TD>
              <TD>
                <InputOperations value={operation.date} />
              </TD>
              <TD>
                <InputOperations value={operation.name} />
              </TD>
              <TD>
                <InputOperations value={operation.category} />
              </TD>
              <TD>
                <InputOperations value={operation.price} />
              </TD>
              <TD>
                <Button variation="danger">Delete</Button>
              </TD>
            </TR>
          );
        })}
    </TBody>
  );
};

const InputOperations = styled(Input)`
  height: 40px;
`;

export default EntranceData;
