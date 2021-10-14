import React from "react";
import copyIcon from "../../assets/icons/clipboard_copy_icon.svg";
import "./Button.css";

type ButtonProps = {
  branchName: string;
}

export const Button = ({branchName}: ButtonProps) => {

  const onClick = async () => {
    chrome.runtime.sendMessage("Hello from the popup!");
    try {
      await navigator.clipboard.writeText(branchName)
      window.close();
    } catch (err) {
      alert((err as Error).message)
    }
  };

  return (
    <div className="buttonContainer">
      <button className="branchButton" onClick={onClick}>
        <span className="branchButton__icon">
          <img src={copyIcon} />
        </span>
        {branchName}
      </button>
    </div>
  );
};