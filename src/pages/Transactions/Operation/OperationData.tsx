import React from 'react';
import Table from '../Components/Table';
import { useOperations } from '../../../hooks/useOperations';
import DataPlaceholder from './DataPlaceholder';
import DataContainer from './DataContainer';

const EntranceData = () => {
  const { loading } = useOperations();
  return (
    <Table.Body>
      <DataPlaceholder isLoading={loading} />
      <DataContainer />
    </Table.Body>
  );
};

export default EntranceData;
