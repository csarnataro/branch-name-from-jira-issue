import React from "react";
import styled from "@emotion/styled";
import copyIcon from "../../assets/icons/clipboard_copy_icon.svg";

type ButtonProps = {
  branchName: string;
}

export const BranchButton = ({branchName}: ButtonProps) => {

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
    <StyledButtonContainer>
      <StyledButton onClick={onClick}>
        <span>
          <BranchButtonIcon src={copyIcon} />
        </span>
        {branchName}
      </StyledButton>
    </StyledButtonContainer>
  );
};

const StyledButtonContainer = styled.div`
  display: flex;
  min-width: 150px;
  padding: 5px;
`;

const BranchButtonIcon = styled.img`
  height: 16px;
  vertical-align: bottom;
  margin-right: 8px;  
`;

const StyledButton = styled.button`
  white-space: nowrap; 
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  font-family: monospace;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  margin-top: 8px;
  padding: 10px;
  text-align: center;
  width: 100%;
  background-color: #333;
  border: solid 2px #ddd;
  font-size: 14px;

  &:hover:enabled {
    border: 2px solid #F06A0A;
  }
`;