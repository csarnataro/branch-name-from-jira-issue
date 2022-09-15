import styled from '@emotion/styled';

const OptionSectionTitle = styled.h4`
  display: flex;
  flex-direction: row;
  margin: 20px 0 15px 0;

  &::after {
      content: "";
      flex: 1 1;
      border-bottom: 1px solid #d3d3d3;
      margin: auto;
      margin-inline-start: 10px;
  }
`;

const OptionsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0;  
`;

const OptionsHeader = styled.header`
  & > h1, 
  & > h2 {
    color: #f9f9f9;
  };

  & > h1 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 24px;
    padding-bottom: 16px;
    & > img {
      margin-right: 8px;
      height: 24px;
    }
  };

  & > h2 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 22px;
  }
`;

const GitHubIcon = styled.img`
  height: 24px;
  vertical-align: bottom;
  margin-right: 8px;  
`;

export {
  GitHubIcon,
  OptionSectionTitle,
  OptionsContainer,
  OptionsHeader,
};
