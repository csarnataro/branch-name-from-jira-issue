import React, { FormEventHandler } from 'react';
import { InputNumberContainer, InputNumberField, InputNumberLabel } from './InputNumber.styled';

type InputNumberProps = {
  label: string | JSX.Element;
  value?: number;
  onChange?: FormEventHandler<HTMLInputElement>;
}

const InputNumber = ({ label, value, onChange }: InputNumberProps) => (
  <InputNumberContainer>
    <InputNumberLabel>
      {label}
    </InputNumberLabel>
    <InputNumberField type="number" value={value} onChange={onChange} />
  </InputNumberContainer>
);

InputNumber.defaultProps = {
  value: undefined,
  onChange: () => {},
};

export default InputNumber;
