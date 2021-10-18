import React, { useEffect, useState } from "react";
import { BranchButton } from "../../components/BranchButton";
import { GetBranchNameResponse, MessageType, MessageTypes } from "../../messages";
import "./popup.css";

const PopupPage = () => {

  const [branchNames, setBranchNames] = useState<string[]>()
  useEffect(() => {
    chrome.runtime.sendMessage({ type: MessageTypes.GET_BRANCH_NAME_REQUEST });

    chrome.runtime.onMessage.addListener((message: MessageType) => {
      console.log("Message received in App.tsx!", message.type);
      switch (message.type) {
        case MessageTypes.GET_BRANCH_NAME_RESPONSE:
          setBranchNames([
            (message as GetBranchNameResponse).branchName,
            'test']);
          break;
        default:
          console.log('IGNORED');
      }
    });
  }, []);
  return (
    <div className="popup" >
      {branchNames ?
        <>
        <div className="popup__result">
          {branchNames.map((branchName) => {
            return <BranchButton branchName={branchName} />
          })}
        </div>
        </>
        : <div className="popup__invalid-text">
          Oh, snap! Looks like this is not a valid JIRA ticket.
        </div>
      }
    </div >
  );
};

export default PopupPage;
