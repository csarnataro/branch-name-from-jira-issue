import React, { useEffect, useState } from 'react';
import BranchButton from '../../components/BranchButton';
import { GetBranchNameResponse, MessageType, MessageTypes } from '../../messages';
import PopupContainer from './PopupPage.styled';

const PopupPage = () => {
  const [branchNames, setBranchNames] = useState<string[]>();
  useEffect(() => {
    chrome.runtime.sendMessage({ type: MessageTypes.GET_BRANCH_NAME_REQUEST });

    chrome.runtime.onMessage.addListener((message: MessageType) => {
      switch (message.type) {
        case MessageTypes.GET_BRANCH_NAME_RESPONSE:
          setBranchNames((message as GetBranchNameResponse).branchNames);
          break;
        default:
          // console.log('IGNORED');
      }
    });
  }, []);
  return (
    <PopupContainer>
      {branchNames
        ? (
          <>
            <div>
              {branchNames.map((branchName) => <BranchButton branchName={branchName} />)}
            </div>
          </>
        )
        : (
          <div>
            Oh, snap! Looks like this is not a valid JIRA ticket.
          </div>
        )}
    </PopupContainer>
  );
};

export default PopupPage;
