import React from 'react';
import Table from '../Components/Table';

const EntranceTitle = () => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.Cell>is Paid?</Table.Cell>
        <Table.Cell>Date</Table.Cell>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell>Category</Table.Cell>
        <Table.Cell>Value</Table.Cell>
        <Table.Cell>Action</Table.Cell>
      </Table.Row>
    </Table.Header>
  );
};

export default EntranceTitle;
