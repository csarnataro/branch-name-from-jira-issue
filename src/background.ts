import { retrieveOptions, saveOption } from "./lib/chromeLocalStorage";
import * as Messages from "./messages";
import { PageInfo } from "./types";

// This file is ran as a background script
// console.log("Hello from background script!")

const getBranchType = (typeText = 'feat'): string => {
  typeText = typeText.toLowerCase().trim();
  switch (typeText) {
    case 'bug':
    case 'enhancement':
      return 'fix'

    case 'story':
    case 'implementation':
      return 'feat'

    default:
      return 'feat'
  }
}

const formatBranchName = ({ issueType, issueName, issueDescription }: PageInfo): string => {
  const branchType = getBranchType(issueType)
  let branchName = `${branchType}/${issueName}-${issueDescription}`
    .replace(/[^0-9a-z\/ \-]/gi, '')
    .trim()
    .replace(/ +/gi, ' ')
    .replace(/ /gi, '-')
    .toLowerCase();
  return branchName;
}


chrome.runtime.onMessage.addListener(
  (message: Messages.MessageType, sender, sendResponse: (response: Messages.GetOptionsResponse) => void): boolean => {
  console.log("Message received in background.js!", message.type);
  switch (message.type) {
    case Messages.MessageTypes.UPDATE_OPTION_REQUEST:
      {
        const typedMessage = (message as Messages.UpdateOptionRequest)
        saveOption(typedMessage.options).then(() => console.log('Should have saved options'));
        break;
      }

    case Messages.MessageTypes.GET_OPTIONS_REQUEST:
      // read from localStorage
      retrieveOptions().then(result => {

        console.log('******** BEGIN: background:49 ********');
        console.dir(result, { depth: null, colors: true });
        console.log('********   END: background:49 ********');
        // TODO: check if it's better to send a broadcast message instead of a response to the caller
        sendResponse({ type: Messages.MessageTypes.GET_OPTIONS_RESPONSE, options: result });
      });
      return true;  
    case Messages.MessageTypes.GET_BRANCH_NAME_REQUEST:
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }).then((tabs) => {
        const activeTab = tabs[0];
        if (activeTab.id) {
          // just dispatch the request to the content page to provide some info
          chrome.tabs.sendMessage(activeTab.id, { type: Messages.MessageTypes.GET_PAGE_INFO_REQUEST });
        }
      });

      break;
    case Messages.MessageTypes.GET_PAGE_INFO_RESPONSE:
      // do something with the info
      {
        const typedMessage = (message as Messages.GetPageInfoResponse)
        const branchName = formatBranchName({
          issueType: typedMessage.pageInfo.issueType,
          issueName: typedMessage.pageInfo.issueName,
          issueDescription: typedMessage.pageInfo.issueDescription
        });
        const response: Messages.GetBranchNameResponse = { type: Messages.MessageTypes.GET_BRANCH_NAME_RESPONSE, branchName }
        chrome.runtime.sendMessage(response);

        break;
      }
    default:
      console.log('IGNORED');
  }
  return true;
});