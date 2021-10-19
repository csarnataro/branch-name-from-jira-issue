import React, {
  FormEvent, useEffect, useRef, useState,
} from 'react';
import Button from '../Button';
import {
  InputButtonContainer,
  InputContainer,
  InputInputContainer,
  MultiValueSelectContainer,
  SelectContainer,
  StyledInput,
  StyledSelect,
} from './MultiValueSelect.styled';

type MultiValueSelectProps = {
  options: string[];
  onChange: (event: CustomEvent) => void;
}

const InputWithButton = ({ value, onChange, onAddClick }: any) => (
  <InputContainer>
    <InputInputContainer>
      <StyledInput
        onChange={onChange}
        type="text"
        value={value}
        placeholder="e.g. username, projectname/username"
        autoComplete="off"
      />
    </InputInputContainer>
    <InputButtonContainer>
      <Button onClick={() => onAddClick(value)}><span>Add prefix</span></Button>
    </InputButtonContainer>
  </InputContainer>

);

const SelectWithButton = ({ options, selectRef, removeSelectedPrefixes }: any) => (
  <SelectContainer>
    <StyledSelect options={options} selectRef={selectRef} />
    <Button onClick={removeSelectedPrefixes}>Remove prefixes</Button>
  </SelectContainer>
);

const MultiValueSelect = (
  { options: initialOptions, onChange }: MultiValueSelectProps,
): JSX.Element => {
  const [prefixes, setPrefixes] = useState(initialOptions);
  const [currentPrefix, setCurrentPrefix] = useState('');
  const selectRef = useRef();

  const addToPrefixes = (value: string): void => {
    setPrefixes([...prefixes, value]);
  };

  const handleOnAddClick = (value: string) => {
    addToPrefixes(value);
    setCurrentPrefix('');
    const e = new CustomEvent('input', {
      bubbles: true,
      detail: {
        prefixes: [...prefixes, value],
      },
    });
    onChange(e);
  };

  useEffect(() => {
    setPrefixes(initialOptions);
  }, [initialOptions]);

  const removeSelectedPrefixes = () => {
    const { options } = selectRef.current as any;

    const selectedOptions = Object.keys(options)
      .filter((optionKey: any) => !options[optionKey].selected)
      .map((selectedOptionKey: any) => options[selectedOptionKey].value);

    setPrefixes(selectedOptions);

    for (let i = 0; i < options.length; i += 1) {
      options[i].selected = false;
    }

    const e = new CustomEvent('input', {
      bubbles: true,
      detail: {
        prefixes: selectedOptions,
      },
    });

    onChange(e);
  };

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
      <SelectWithButton
        selectRef={selectRef}
        options={prefixes}
        removeSelectedPrefixes={removeSelectedPrefixes}
      />
    </MultiValueSelectContainer>
  );
};

export default MultiValueSelect;
