import React, { FormEventHandler } from 'react';
import {
  CheckBoxContainer, CheckBoxInput, CheckBoxLabel, CheckBoxLabelContainer,
} from './CheckBox.styled';

type CheckBoxProps = {
  label: string | JSX.Element;
  checked?: boolean;
  onChange?: FormEventHandler<HTMLInputElement>;
}

const CheckBox = ({ label, checked, onChange }: CheckBoxProps) => (
  <CheckBoxContainer>
    <CheckBoxLabelContainer>
      <CheckBoxInput type="checkbox" checked={checked} onChange={onChange} />
      <CheckBoxLabel>{label}</CheckBoxLabel>
    </CheckBoxLabelContainer>
  </CheckBoxContainer>
);

CheckBox.defaultProps = {
  checked: false,
  onChange: () => {},
};

export default CheckBox;
