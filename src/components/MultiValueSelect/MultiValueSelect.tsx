import React, { FormEvent, FormEventHandler, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Button } from "../Button/Button";

type MultiValueSelectProps = {
  options: string[];
  onChange: FormEventHandler<HTMLInputElement>;
}

export const MultiValueSelect = ({options }: MultiValueSelectProps): JSX.Element => {

  const selectRef = useRef();
  const [prefixes, setPrefixes] = useState(options);
  const [currentPrefix, setCurrentPrefix] = useState('');

  const addToPrefixes = (value: string) : void => {
    setPrefixes([...prefixes, value]);
  }

  return (
    <MultiValueSelectContainer>
      <span className="multivalueselect__label">Add custom prefixes:</span>
      <InputWithButton 
        value={currentPrefix}
        onAdd={(value: any) => {
          addToPrefixes(value);
        }}

        onChange={(e: FormEvent<HTMLInputElement>) => {
          setCurrentPrefix(e.currentTarget.value);
          // (selectRef as any)._valueTracker?.setValue(["a"]);
          // (e: FormEvent<HTMLInputElement>) => {
          // return new Event('input', { bubbles: true})
            
          //   // var event = new Event('input', { bubbles: true });
          //   // (selectRef.current as any).dispatchEvent(event);
          // }
        }}
        />
      <SelectWithButton options={prefixes} selectRef={selectRef} />
    </MultiValueSelectContainer>
  );
}

const SelectWithButton = ({options, selectRef}: any) => {
  return (
    <SelectContainer>
      <StyledSelect options={options} selectRef={selectRef} />
      <Button>Remove prefixes</Button>
    </SelectContainer>
  );
}

const InputWithButton = ({value, onChange, onAdd}: any) => {
  return (
    <InputContainer>
      <InputInputContainer>
        <StyledInput
          onChange={onChange}
          className="multivalueselect__input"
          type="text"
          value={value}
          placeholder="e.g. username, projectname/username" autoComplete="off" />
      </InputInputContainer>
      <InputButtonContainer>
        <Button onClick={() => onAdd(value)}><span>Add prefix</span></Button>
      </InputButtonContainer>
    </InputContainer>

  );
}

const SelectField = ({ options, className, selectRef }: any) => {
  return (
    <select multiple className={className} ref={selectRef}>
      {options?.map((option: any) => <option>{option}</option>)}
    </select>
  );
};

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