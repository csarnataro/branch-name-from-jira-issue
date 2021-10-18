import React, { FormEvent, FormEventHandler, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Button } from "../Button/Button";

type MultiValueSelectProps = {
  options: string[];
  onChange: (event: CustomEvent) => void;
}

export const MultiValueSelect = ({ options, onChange }: MultiValueSelectProps): JSX.Element => {

  const [prefixes, setPrefixes] = useState(options);
  const [currentPrefix, setCurrentPrefix] = useState('');
  const selectRef = useRef();

  const handleOnAddClick = (value: string) => {
    addToPrefixes(value);
    setCurrentPrefix('');
    const e = new CustomEvent("input", {
      bubbles: true,
      detail: {
        prefixes: [...prefixes, value]
      }
    });
    onChange(e);
  }

  useEffect(() => {
    setPrefixes(options)
  }, [options]);

  const addToPrefixes = (value: string): void => {
    setPrefixes([...prefixes, value]);
  }

  const removeSelectedPrefixes = () => {
    const options = (selectRef.current as any).options;

    const selectedOptions = Object.keys(options)
      .filter((optionKey: any) => !options[optionKey].selected)
      .map((selectedOptionKey: any) => options[selectedOptionKey].value);

    setPrefixes(selectedOptions);

    for (let i = 0; i < options.length; i++) {
      options[i].selected = false;
    }

    const e = new CustomEvent("input", {
      bubbles: true,
      detail: {
        prefixes: selectedOptions,
      }
    });

    onChange(e);

  }

  return (
    <MultiValueSelectContainer>
      <span>Add custom prefixes:</span>
      <InputWithButton
        value={currentPrefix}
        onAddClick={handleOnAddClick}
        onChange={(e: FormEvent<HTMLInputElement>) => {
          setCurrentPrefix(e.currentTarget.value);
        }}
      />
      <SelectWithButton selectRef={selectRef} options={prefixes} removeSelectedPrefixes={removeSelectedPrefixes} />
    </MultiValueSelectContainer>
  );
}

const SelectWithButton = ({ options, selectRef, removeSelectedPrefixes }: any) => {
  return (
    <SelectContainer>
      <StyledSelect options={options} selectRef={selectRef} />
      <Button onClick={removeSelectedPrefixes}>Remove prefixes</Button>
    </SelectContainer>
  );
}

const InputWithButton = ({ value, onChange, onAddClick }: any) => {
  return (
    <InputContainer>
      <InputInputContainer>
        <StyledInput
          onChange={onChange}
          type="text"
          value={value}
          placeholder="e.g. username, projectname/username" autoComplete="off" />
      </InputInputContainer>
      <InputButtonContainer>
        <Button onClick={() => onAddClick(value)}><span>Add prefix</span></Button>
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