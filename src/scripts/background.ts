import { retrieveOptions, saveOption } from '../lib/chromeLocalStorage';
import * as Messages from '../messages';
import { PageInfo } from '../types';

// This file is ran as a background script
// console.log("Hello from background script!")

const getBranchType = (typeText = 'feat'): string => {
  const sanitizedTypeText = typeText.toLowerCase().trim();
  switch (sanitizedTypeText) {
    case 'bug':
    case 'enhancement':
      return 'fix';

    case 'story':
    case 'implementation':
      return 'feat';

    default:
      return 'feat';
  }
};

type FormatBranchNamesPros = {
  pageInfo: PageInfo;
  enableConventionalPrefix: boolean;
}

const formatBranchName = (
  { pageInfo, enableConventionalPrefix }: FormatBranchNamesPros,
): string => {
  const { issueType, issueName, issueDescription } = pageInfo;
  const branchType = enableConventionalPrefix ? `${getBranchType(issueType)}/` : '';
  const branchName = `${branchType}${issueName}-${issueDescription}`
    // eslint-disable-next-line no-useless-escape
    .replace(/[^0-9a-z\/ \-]/gi, '')
    .trim()
    .replace(/ +/gi, ' ')
    .replace(/ /gi, '-')
    .toLowerCase();

  return branchName;
};

const getBranchNames = async (pageInfo: PageInfo): Promise<string[]> => {
  const allOptions = await retrieveOptions();
  const {
    enableConventionalPrefix,
    addGitCommand,
    customPrefixes: customPrefixesOptions,
    maxBranchLength,
  } = allOptions;

  const formattedBranchName = formatBranchName({
    pageInfo,
    enableConventionalPrefix: !!enableConventionalPrefix,
  });
  const parsedCustomPrefixes = customPrefixesOptions
    ? JSON.parse(customPrefixesOptions) as string[]
    : [];

  if (parsedCustomPrefixes.length === 0) {
    return [formattedBranchName];
  }
  return parsedCustomPrefixes.map((prefix) => {
    let branchName = `${prefix}${prefix.endsWith('/') ? '' : '/'}${formattedBranchName}`;
    branchName = branchName.replace(/--+/g, '-');
    return `${addGitCommand ? 'git checkout -b ' : ''}${branchName.substring(0, maxBranchLength)}`;
  });
};

chrome.runtime.onMessage.addListener(
  (message: Messages.MessageType, sender, sendResponse): boolean => {
    switch (message.type) {
      case Messages.MessageTypes.UPDATE_OPTION_REQUEST:
      {
        const typedMessage = (message as Messages.UpdateOptionRequest);
        saveOption(typedMessage.options)
          .catch((err) => console.error(err));
        break;
      }

      case Messages.MessageTypes.GET_OPTIONS_REQUEST:
        // read from localStorage
        retrieveOptions().then((result) => {
          // TODO: check if it's better to send a broadcast message
          // instead of a response to the caller
          sendResponse({ type: Messages.MessageTypes.GET_OPTIONS_RESPONSE, options: result });
        });
        return true;
      case Messages.MessageTypes.GET_BRANCH_NAME_REQUEST:
        chrome.tabs.query({
          active: true,
          currentWindow: true,
        }).then((tabs) => {
          const activeTab = tabs[0];
          if (activeTab.id) {
          // just dispatch the request to the content page to provide some info
            chrome.tabs.sendMessage(
              activeTab.id,
              { type: Messages.MessageTypes.GET_PAGE_INFO_REQUEST },
            );
          }
        });

        break;
      case Messages.MessageTypes.GET_PAGE_INFO_RESPONSE:
      {
        const typedMessage = (message as Messages.GetPageInfoResponse);
        getBranchNames({
          issueType: typedMessage.pageInfo.issueType,
          issueName: typedMessage.pageInfo.issueName,
          issueDescription: typedMessage.pageInfo.issueDescription,
        }).then((branchNames) => {
          const response: Messages.GetBranchNameResponse = {
            type: Messages.MessageTypes.GET_BRANCH_NAME_RESPONSE,
            branchNames,
          };
          chrome.runtime.sendMessage(response);
        });
        break;
      }
      default:
        // console.log('IGNORED');
    }
    return true;
  },
);
