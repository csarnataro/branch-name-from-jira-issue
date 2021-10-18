import React from "react";
import styled from '@emotion/styled';

type CodeProps = {
  inline?: boolean;
}

const StyledCode = styled.code<CodeProps>`
  font-weight: bold;
  display: ${(props: any) => !!props.inline? 'inline' : 'block'}
`;

export const BlockCode = ({children}: any) => <StyledCode>{children}</StyledCode>

export const InlineCode = ({children}: any) => <StyledCode inline>{children}</StyledCode>
