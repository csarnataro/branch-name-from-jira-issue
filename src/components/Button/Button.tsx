import React, { useState } from "react";
import "./Button.css";

export const Button = () => {

  const onClick = () => {
    chrome.runtime.sendMessage("Hello from the popup!");
  };

  return (
    <div className="buttonContainer">
      <button className="snowButton" onClick={onClick}>
        Copy to clipboard
      </button>
    </div>
  );
};