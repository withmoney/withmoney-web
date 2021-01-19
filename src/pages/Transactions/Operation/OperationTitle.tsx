import React from 'react';
import Table from '../Components/Table';

const EntranceTitle = () => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.Cell minWidth={80} width={80}>
          is Paid?
        </Table.Cell>
        <Table.Cell minWidth={130} width={130}>
          Date
        </Table.Cell>
        <Table.Cell minWidth={200}>Name</Table.Cell>
        <Table.Cell minWidth={200}>Category</Table.Cell>
        <Table.Cell minWidth={200}>Value</Table.Cell>
        <Table.Cell minWidth={80} width={80}>
          Action
        </Table.Cell>
      </Table.Row>
    </Table.Header>
  );
};

export default EntranceTitle;
