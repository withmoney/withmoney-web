import React from 'react';
import { THeader, TR, TH } from '../Components/Table';

const EntranceTitle = () => {
  return (
    <THeader>
      <TR>
        <TH>is Paid?</TH>
        <TH>Date</TH>
        <TH>Name</TH>
        <TH>Category</TH>
        <TH>Value</TH>
        <TH>Action</TH>
      </TR>
    </THeader>
  );
};

export default EntranceTitle;
