import React, { useState } from "react";
import "./Button.css";

export const Button = () => {
  const [snowing, setSnowing] = useState(true);

  const onClick = () => {
    setSnowing(!snowing);
    chrome.runtime.sendMessage("Hello from the popup!");
  };

  return (
    <div className="buttonContainer">
      <button className="snowButton" onClick={onClick}>
        {snowing ? "Disable the snow 🥶" : "Let it snow! ❄️"}
      </button>
    </div>
  );
};