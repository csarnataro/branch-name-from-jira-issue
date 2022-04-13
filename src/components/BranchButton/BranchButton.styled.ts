import styled from '@emotion/styled';

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

  &:hover {
    border: 2px solid #F06A0A;
  }
`;

export {
  StyledButtonContainer,
  BranchButtonIcon,
  StyledButton,
};
