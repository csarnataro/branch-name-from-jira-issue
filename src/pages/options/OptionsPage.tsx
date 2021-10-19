import React, {
  ChangeEvent, FormEventHandler, useEffect, useState,
} from 'react';
import logo from '../../../public/icon32.png';
import CheckBox from '../../components/CheckBox';
import { InlineCode } from '../../components/Code';
import InputNumber from '../../components/InputNumber';
import MultiValueSelect from '../../components/MultiValueSelect';
import OptionsButton from '../../components/OptionsButton';
import { GetOptionsResponse, MessageTypes, UpdateOptionRequest } from '../../messages';
import { OptionsContainer, OptionSectionTitle, OptionsHeader } from './OptionsPage.styled';

const updateOption = (stateSetter: Function, optionName: string, optionValue: any) => {
  try {
    stateSetter(optionValue);
    const message: UpdateOptionRequest = {
      type: MessageTypes.UPDATE_OPTION_REQUEST,
      options: {
        [optionName]: optionValue,
      },
    };
    chrome.runtime.sendMessage(message);
  } catch (err) {
    console.error(err);
  }
};

const updateOptionHandler = (stateSetter: Function, optionName: string, isCheckbox = false):
    FormEventHandler<HTMLInputElement> => (event: ChangeEvent<HTMLInputElement>) => {
  try {
    let optionValue;
    if (isCheckbox) {
      optionValue = event.target.checked;
    } else {
      optionValue = event.target.value;
    }
    updateOption(stateSetter, optionName, optionValue);
  } catch (err) {
    console.error(err);
  }
};

const OptionsSection = ({ title, children }: any) => (
  <>
    <OptionSectionTitle>{title}</OptionSectionTitle>
    {children}
  </>
);

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
          const parsedCustomPrefixes = customPrefixesOptions
            ? JSON.parse(customPrefixesOptions) as string[]
            : [];
          setCustomPrefixes(parsedCustomPrefixes);
        } catch (err) {
          console.error(`Can't parse [${customPrefixesOptions}]`);
        }
      });
  }, []);

  return (
    <OptionsContainer>
      <OptionsHeader>
        <h1>
          <img src={logo} alt="Branch name from Jira issue logo" />
          Branch name from Jira issue
        </h1>
        <h2>Settings</h2>
      </OptionsHeader>

      <OptionsSection title="General">
        <CheckBox
          checked={addGitCommand}
          onChange={updateOptionHandler(setAddGitCommand, 'addGitCommand', true)}
          label={(
            <>
              Add
              <InlineCode>git checkout -b</InlineCode>
              {' '}
              when copying to clipboard
            </>
)}
        />
        <InputNumber
          label={(
            <>
              Truncate branch name to
              <InlineCode>n</InlineCode>
              {' '}
              characters
            </>
)}
          value={maxBranchLength}
          onChange={updateOptionHandler(setMaxBranchLength, 'maxBranchLength')}
        />
        <OptionsButton sectionLabel="Reset to defaults" buttonLabel="Reset" />
      </OptionsSection>

      <OptionsSection title="Prefixes">
        <CheckBox
          checked={useStandardPrefix}
          onChange={updateOptionHandler(
            setUseStandardPrefix,
            'enableStandardPrefix',
            true,
          )}
          label={(
            <>
              Add conventional git prefixes, e.g.
              <code>
                <strong>feat</strong>
                /story-001-do-something,
                <strong>docs/</strong>
                improve-readme
              </code>
            </>
)}
        />
        <MultiValueSelect
          options={customPrefixes}
          onChange={(e: CustomEvent) => {
            updateOption(setCustomPrefixes, 'customPrefixes', e.detail.prefixes);
          }}
        />
      </OptionsSection>
    </OptionsContainer>
  );
};

export default OptionPage;
