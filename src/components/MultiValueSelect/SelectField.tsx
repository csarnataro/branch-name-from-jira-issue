import React from 'react';

const SelectField = ({ options, className, selectRef }: any) => (
  <select multiple className={className} ref={selectRef}>
    {options?.map((option: any) => <option>{option}</option>)}
  </select>
);

export default SelectField;
