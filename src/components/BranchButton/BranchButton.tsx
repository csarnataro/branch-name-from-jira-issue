import React from 'react';
import copyIcon from '../../assets/icons/clipboard_copy_icon.svg';
import { BranchButtonIcon, StyledButton, StyledButtonContainer } from './BranchButton.styled';

type ButtonProps = {
  branchName: string;
}

const BranchButton = ({ branchName }: ButtonProps) => {
  const onClick = async () => {
    chrome.runtime.sendMessage('Hello from the popup!');
    try {
      await navigator.clipboard.writeText(branchName);
      window.close();
    } catch (err) {
      console.error((err as Error).message);
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

export default BranchButton;
