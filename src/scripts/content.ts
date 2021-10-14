import { MessageType, MessageTypes, GetPageInfoResponse } from "../messages";

// 
const issueContainerId = 'issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container';
const issueDescriptionId = 'issue.views.issue-base.foundation.summary.heading';


// This file is injected as a content script
console.log("Hello from content script!")
chrome.runtime.onMessage.addListener((message: MessageType) => {
  console.log("Message received in content.js!", message.type);
  switch (message.type) {
    case MessageTypes.GET_PAGE_INFO_REQUEST:
      // get elements from page
      const issueTypeAndTitleContainerElement = document.querySelector(`div[data-test-id=\'${issueContainerId}\']`);
      const issueDescriptionElement = document.querySelector(`h1[data-test-id=\'${issueDescriptionId}\']`);
      const issueTypeImg = issueTypeAndTitleContainerElement 
        ? issueTypeAndTitleContainerElement.querySelector('img') 
        : '';
      const issueType = issueTypeImg 
        ? issueTypeImg.alt 
        : 'fix';

      const issueName = issueTypeAndTitleContainerElement 
        ? (issueTypeAndTitleContainerElement as HTMLElement).innerText 
        : '';
      
        const issueDescription = issueDescriptionElement 
          ? (issueDescriptionElement as HTMLElement).innerText 
          : '';

      const response: GetPageInfoResponse = {
        type: MessageTypes.GET_PAGE_INFO_RESPONSE,
        pageInfo: {
          issueName,
          issueType,
          issueDescription
        }

      };
      chrome.runtime.sendMessage(response)
      break;
    default:
      console.log('IGNORED');
  }
});