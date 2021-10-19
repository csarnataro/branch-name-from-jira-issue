import styled from '@emotion/styled';

const InputNumberContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;  
`;

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

export {
  InputNumberContainer,
  InputNumberField,
  InputNumberLabel,
};
