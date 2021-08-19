import { GetBranchNameResponse, GetPageInfoResponse, MessageType, MessageTypes, PageInfo } from "./messages";

// This file is ran as a background script
console.log("Hello from background script!")

const getBranchType = (typeText = 'feat'): string => {
  typeText = typeText.toLowerCase().trim();
  switch (typeText) {
    case 'bug':
    case 'enhancement': return 'fix'

    case 'story':
    case 'implementation': return 'feat'

    default: return 'feat'
  }
}

const formatBranchName = ({ issueType, issueName, issueDescription }: PageInfo): string => {
  const branchType = getBranchType(issueType)
  let branchName = `${branchType}/${issueName}-${issueDescription}`
    // let branchName = document.title;
    // branchName = branchName.substring(0, branchName.indexOf(' - Arduino Jira'));
    .replace(/[^0-9a-z\/ \-]/gi, '')
    .trim()
    .replace(/ +/gi, ' ')
    .replace(/ /gi, '-')
    .toLowerCase();
  return branchName;
}


chrome.runtime.onMessage.addListener((message: MessageType) => {
  console.log("Message received in background.js!", message.type);
  switch (message.type) {
    case MessageTypes.GET_BRANCH_NAME_REQUEST:
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }).then((tabs) => {
        const activeTab = tabs[0];
        if (activeTab.id) {
          // just dispatch the request to the content page to provide some info
          chrome.tabs.sendMessage(activeTab.id, { type: MessageTypes.GET_PAGE_INFO_REQUEST });
        }
      });

      break;
    case MessageTypes.GET_PAGE_INFO_RESPONSE:
      // do something with the info
      const typedMessage = (message as GetPageInfoResponse)
      const branchName = formatBranchName({
        issueType: typedMessage.pageInfo.issueType,
        issueName: typedMessage.pageInfo.issueName,
        issueDescription: typedMessage.pageInfo.issueDescription
      });
      const response: GetBranchNameResponse = { type: MessageTypes.GET_BRANCH_NAME_RESPONSE, branchName }
      chrome.runtime.sendMessage(response);

      break;
    default:
      console.log('IGNORED');
    }

});