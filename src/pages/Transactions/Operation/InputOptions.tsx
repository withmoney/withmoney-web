import React, { useState } from 'react';
import Input from '../../../components/Input';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const InputOperations = ({ value, onChange, ...props }: Props) => {
  const [newValue, setNewValue] = useState<string>(value);

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    const ChangeName = value;
    setNewValue(ChangeName);
    onChange(ChangeName);
  };

  return <Input {...props} type="text" onChange={handleChange} value={newValue} />;
};

export default InputOperations;
