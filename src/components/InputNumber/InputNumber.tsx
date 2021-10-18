import React, { FormEventHandler } from "react";
import styled from '@emotion/styled';

type InputNumberProps = {
  label: string | JSX.Element;
  value?: number;
  onChange?: FormEventHandler<HTMLInputElement>;
}

export const InputNumber = ({ label, value, onChange }: InputNumberProps) => {
  return (
    <InputNumberContainer>
      <InputNumberLabel>
        {label}
      </InputNumberLabel>
      <InputNumberField type="number" value={value} onChange={onChange} />
    </InputNumberContainer>
  );
}

const InputNumberContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;  
`

const InputNumberField = styled.input`
  background-color: #222;
  border: 1px solid #555;
  color: #ddd;
  padding: 6px;
  max-width: 80px;
`;

const InputNumberLabel = styled.label`
  flex: 1 0 150px;
  max-width: 300px;  
`;