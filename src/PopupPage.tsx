import React, { useEffect, useState } from "react";
import "./PopupPage.css";
import { Button } from "./components/Button";
import { GetBranchNameResponse, MessageType, MessageTypes } from "./messages";

const PopupPage = () => {

  const [branchName, setBranchName] = useState<string>()
  useEffect(() => {
    chrome.runtime.sendMessage({ type: MessageTypes.GET_BRANCH_NAME_REQUEST });

    chrome.runtime.onMessage.addListener((message: MessageType) => {
      console.log("Message received in App.tsx!", message.type);
      switch (message.type) {
        case MessageTypes.GET_BRANCH_NAME_RESPONSE:
          setBranchName((message as GetBranchNameResponse).branchName);
          break;
        default:
          console.log('IGNORED');
      }
    });
  }, []);
  return (
    <div className="popup" >
      {branchName ?
        <>
        <div className="popup__result">
          <pre>[{branchName}]</pre>
        </div>
        <Button />
        </>
        : <div className="popup__invalid-text">
          Looks like this is not a valid JIRA ticket.
        </div>
      }
    </div >
  );
};

export default PopupPage;
