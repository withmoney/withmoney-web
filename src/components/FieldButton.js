import React from 'react';

const FieldButton = ({ children, ...othersProps }) => (
  <div className="field">
    <button
      type="button"
      className="button"
      {...othersProps}
    >
      {children}
    </button>
  </div>
);


export default FieldButton;
