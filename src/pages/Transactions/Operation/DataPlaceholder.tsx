import React from 'react';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader';
import Table from '../Components/Table';

type Props = {
  isLoading: boolean;
  rows?: number;
};

const DataPlaceholder = ({ isLoading, rows = 2 }: Props): any => {
  const tableRows = Array.from({ length: rows });
  if (!!isLoading) {
    return tableRows.map((_, rowIndex) => (
      <Table.Row key={rowIndex}>
        <Table.Cell>
          <CheckBox disabled />
        </Table.Cell>
        <LoadingData />
        <LoadingData />
        <LoadingData />
        <LoadingData />
      </Table.Row>
    ));
  }
  return null;
};

const LoadingData = () => {
  return (
    <Table.Cell>
      <ContentLoader
        speed={2}
        width="100%"
        height={40}
        backgroundColor="#f3f3f3"
        foregroundColor="#c0c0c0"
      >
        <rect x="0" y="0" rx="3" ry="3" width="100%" height="40" />
      </ContentLoader>
    </Table.Cell>
  );
};

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  width: 23px;
  height: 23px;
  background: linear-gradient(0deg, #f4f4f4, #f4f4f4), linear-gradient(0deg, #f4f4f4, #f4f4f4),
    #f4f4f4;
`;

export default DataPlaceholder;
