import React, {
  ChangeEvent, FormEventHandler, useEffect, useState,
} from 'react';
import Anchor from '../../components/Anchor';
import logo from '../../../public/icon32.png';
import githubLogo from '../../assets/icons/github_logo.svg';
import CheckBox from '../../components/CheckBox';
import { InlineCode } from '../../components/Code';
import InputNumber from '../../components/InputNumber';
import MultiValueSelect from '../../components/MultiValueSelect';
import OptionsButton from '../../components/OptionsButton';
import { GetOptionsResponse, MessageTypes, UpdateOptionRequest } from '../../messages';
import {
  GitHubIcon, OptionsContainer, OptionSectionTitle, OptionsHeader,
} from './OptionsPage.styled';

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
  const [useConventionalPrefix, setUseConventionalPrefix] = useState(false);
  const [addGitCommand, setAddGitCommand] = useState(false);
  const [maxBranchLength, setMaxBranchLength] = useState<number>();
  const [customPrefixes, setCustomPrefixes] = useState<string[]>([]);

  const resetAllOptions = () => {
    updateOption(setAddGitCommand, 'addGitCommand', false);
    updateOption(setMaxBranchLength, 'maxBranchLength', '');
    updateOption(setUseConventionalPrefix, 'enableConventionalPrefix', false);
    updateOption(setCustomPrefixes, 'customPrefixes', []);
  };

  useEffect(() => {
    chrome.runtime.sendMessage({ type: MessageTypes.GET_OPTIONS_REQUEST },
      (data: GetOptionsResponse) => {
        setAddGitCommand(Boolean(data?.options?.addGitCommand));
        setUseConventionalPrefix(Boolean(data?.options?.enableConventionalPrefix));
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
              {' '}
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
              {' '}
              <InlineCode>n</InlineCode>
              {' '}
              characters
            </>
          )}
          value={maxBranchLength}
          onChange={updateOptionHandler(setMaxBranchLength, 'maxBranchLength')}
        />
        <OptionsButton onClick={() => resetAllOptions()} sectionLabel="Reset to defaults" buttonLabel="Reset" />
      </OptionsSection>

      <OptionsSection title="Prefixes">
        <CheckBox
          checked={useConventionalPrefix}
          onChange={updateOptionHandler(
            setUseConventionalPrefix,
            'enableConventionalPrefix',
            true,
          )}
          label={(
            <>
              Add conventional git prefixes, e.g.
              {' '}
              <InlineCode bold={false}>
                <strong>feat</strong>
                /story-001-do-something,
                <strong>docs/</strong>
                improve-readme
              </InlineCode>
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
      <OptionsSection title="Contribute">
        <GitHubIcon src={githubLogo} />
        <Anchor href="https://github.com/csarnataro/branch-name-from-jira-issue" target="_blank" rel="noreferrer">
          Source code on GitHub
        </Anchor>
      </OptionsSection>

    </OptionsContainer>
  );
};

export default OptionPage;
