import styled from '@emotion/styled';
import SelectField from './SelectField';

const SelectContainer = styled.div`
  display: flex;
`;

const StyledSelect = styled(SelectField)`
  flex: 1;
  height: 120px;
  max-width: 400px;
  margin-right: 8px;
  padding: 4px;
  font-family: Verdana,Arial,sans-serif;
  box-sizing: border-box;
  width: 100%;
  background-color: #222;
  border: 1px solid #555;
  color: #ddd;  
`;

const StyledInput = styled.input`
  background-color: #222;
  border: 1px solid #555;
  color: #ddd;
  box-sizing: border-box;
  width: 100%;
  padding: 6px;  
`;

const MultiValueSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  line-height: 1.6;
  font-family: Verdana, Arial, sans-serif;
  color: #ddd;
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
  float: left;
  width: 100%;
  margin-inline-end: 10px;
  padding-top: 5px;
  line-height: 1.6;
  color: #ddd;
`;

const InputInputContainer = styled.div`
  flex: 1;
  max-width: 400px;
`;

const InputButtonContainer = styled.div`
  margin-left: 10px;
`;

export {
  InputButtonContainer,
  InputContainer,
  InputInputContainer,
  MultiValueSelectContainer,
  SelectContainer,
  StyledInput,
  StyledSelect,
};
