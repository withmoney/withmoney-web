import React from 'react';

const FieldInput = ({ ...othersProps }) => (
  <div className="field">
    <input
      type="text"
      className="field__input"
      {...othersProps}
    />
  </div>
);

export default FieldInput;
