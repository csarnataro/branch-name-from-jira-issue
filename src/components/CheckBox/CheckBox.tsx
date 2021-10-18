import React, { FormEventHandler } from "react";
import styled from "@emotion/styled";

const CheckBoxContainer = styled.div`
  max-width: 600px;
  white-space: nowrap;
`;

const CheckBoxInput = styled.input`
  flex: none;
  margin-inline-end: 0.8em;
`;

const CheckBoxLabelContainer = styled.label`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
`;

const CheckBoxLabel = styled.span``;

type CheckBoxProps = {
  label: string | JSX.Element;
  checked?: boolean;
  onChange?: FormEventHandler<HTMLInputElement>;
}

export const CheckBox = ({ label, checked, onChange }: CheckBoxProps) => {
  return (
    <CheckBoxContainer>
      <CheckBoxLabelContainer>
        <CheckBoxInput type="checkbox" checked={checked} onChange={onChange} />
        <CheckBoxLabel>{label}</CheckBoxLabel>
      </CheckBoxLabelContainer>
    </CheckBoxContainer>
  );
}
