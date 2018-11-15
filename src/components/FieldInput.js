import React from 'react';

const FieldInput = ({ id, ...othersProps }) => (
  <div className="field">
    <input
      type="text"
      className="field__input"
      name={id}
      id={id}
      {...othersProps}
    />
  </div>
);

export default FieldInput;
