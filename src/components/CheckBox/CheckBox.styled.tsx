import styled from '@emotion/styled';

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

export {
  CheckBoxContainer, CheckBoxInput, CheckBoxLabelContainer, CheckBoxLabel,
};
