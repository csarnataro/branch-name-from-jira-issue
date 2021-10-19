import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import BranchButton from '../../components/BranchButton';
import { GetBranchNameResponse, MessageType, MessageTypes } from '../../messages';

const PopupContainer = styled.div`
  text-align: center;
  background-color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ddd;
  min-width: 200px;
  padding: 10px;
`;

const PopupPage = () => {
  const [branchNames, setBranchNames] = useState<string[]>();
  useEffect(() => {
    chrome.runtime.sendMessage({ type: MessageTypes.GET_BRANCH_NAME_REQUEST });

    chrome.runtime.onMessage.addListener((message: MessageType) => {
      switch (message.type) {
        case MessageTypes.GET_BRANCH_NAME_RESPONSE:
          setBranchNames([
            (message as GetBranchNameResponse).branchName,
            'test']);
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
            <div className="popup__result">
              {branchNames.map((branchName) => <BranchButton branchName={branchName} />)}
            </div>
          </>
        )
        : (
          <div className="popup__invalid-text">
            Oh, snap! Looks like this is not a valid JIRA ticket.
          </div>
        )}
    </PopupContainer>
  );
};

export default PopupPage;
