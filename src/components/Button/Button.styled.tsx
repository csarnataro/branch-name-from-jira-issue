import styled from '@emotion/styled';

const StyledButton = styled.button`
  white-space: pre;
  padding: .4em 1em;
  position: relative;
  cursor: pointer;
  vertical-align: middle;
  text-align: center;
  user-select: none;
  overflow: visible;
  font-weight: normal;
  text-decoration: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  font-family: Verdana,Arial,sans-serif;
  background-color: #555;
  background-image: none;
  border: 1px solid #777;
  color: #f9f9f9;
  height: fit-content;

  &:hover {
    background-color: #666;
    border: 1px solid #bbb;    
  }
`;

export default StyledButton;
