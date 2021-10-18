import styled from '@emotion/styled';
import React, { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from 'react';
import logo from '../../../public/icon32.png';
import { CheckBox } from '../../components/CheckBox';
import { InlineCode } from '../../components/Code';
import { InputNumber } from '../../components/InputNumber';
import { MultiValueSelect } from '../../components/MultiValueSelect';
import { OptionsButton } from '../../components/OptionsButton';
import { GetOptionsResponse, MessageTypes, UpdateOptionRequest } from '../../messages';

const updateOptionWith = 
  (stateSetter: Function, optionName: string, isCheckbox = false): 
    FormEventHandler<HTMLInputElement> => (event: ChangeEvent<HTMLInputElement>) => {
  try {
    let optionValue;
    if (isCheckbox) {
      optionValue = event.target.checked;
    } else {
      optionValue = event.target.value;
    }
    stateSetter(optionValue);
    const message: UpdateOptionRequest = {
      type: MessageTypes.UPDATE_OPTION_REQUEST,
      options: {
        [optionName]: optionValue
      }
    };
    chrome.runtime.sendMessage(message);
  } catch (err) {
    console.error(err);
  }
}

const OptionPage = () => {
  const [useStandardPrefix, setUseStandardPrefix] = useState(false);
  const [addGitCommand, setAddGitCommand] = useState(false);
  const [maxBranchLength, setMaxBranchLength] = useState<number>();
  const [customPrefixes, setCustomPrefixes] = useState<string []>([]);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: MessageTypes.GET_OPTIONS_REQUEST },
      (data: GetOptionsResponse) => {
        setAddGitCommand(Boolean(data?.options?.addGitCommand));
        setUseStandardPrefix(Boolean(data?.options?.enableStandardPrefix));
        setMaxBranchLength(data?.options?.maxBranchLength);
        const customPrefixesOptions = data?.options?.customPrefixes;
        try {
          // const parsedCustomPrefixes = JSON.parse(customPrefixesOptions);
          // setCustomPrefixes( as string[]);
        } catch (err) {
          console.error(`Can't parse [${customPrefixesOptions}]`);
        }
      });
  }, []);

  return (
    <OptionsContainer>
      <OptionsHeader>
        <h1>
          <img src={logo} />
          Branch name from Jira issue
        </h1>
        <h2>Settings</h2>
      </OptionsHeader>

      <OptionsSection title="General">
        <CheckBox
          checked={addGitCommand}
          onChange={updateOptionWith(setAddGitCommand, 'addGitCommand', true)}
          label={<>Add <InlineCode>git checkout -b</InlineCode> when copying to clipboard</>}
        />
        <InputNumber 
          label={<>Truncate branch name to <InlineCode>n</InlineCode> characters</>}
          value={maxBranchLength}
          onChange={updateOptionWith(setMaxBranchLength, 'maxBranchLength')}
        />
        <OptionsButton sectionLabel="Reset to defaults" buttonLabel="Reset" />
      </OptionsSection>

      <OptionsSection title="Prefixes">
        <CheckBox
          checked={useStandardPrefix}
          onChange={updateOptionWith(
            setUseStandardPrefix,
            'enableStandardPrefix',
            true)}
          label={<>
            Add conventional git prefixes, e.g. 
            <code><strong>feat</strong>/story-001-do-something, 
            <strong>docs/</strong>improve-readme</code>
          </>}
        />
        <MultiValueSelect 
          options={customPrefixes} 
          onChange={(e) => updateOptionWith(setCustomPrefixes, 'customPrefixes')(e)} />
      </OptionsSection>
    </OptionsContainer>
  )
}

const OptionsSection = ({ title, children }: any) => {
  return (
    <>
      <OptionSectionTitle>{title}</OptionSectionTitle>
      {children}
    </>
  );
}

const OptionSectionTitle = styled.h4`
  display: flex;
  flex-direction: row;
  margin: 20px 0 15px 0;

  &::after {
      content: "";
      flex: 1 1;
      border-bottom: 1px solid #d3d3d3;
      margin: auto;
      margin-inline-start: 10px;
  }
`;

const OptionsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0;  
`;

const OptionsHeader = styled.header`
  & > h1, 
  & > h2 {
    color: #f9f9f9;
  };

  & > h1 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 24px;
    padding-bottom: 16px;
    & > img {
      margin-right: 8px;
      height: 24px;
    }
  };

  & > h2 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 22px;
  }
`;

export default OptionPage;