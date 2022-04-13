import React from 'react';
import StyledCode from './Code.styled';

export const BlockCode = ({ children, bold = true }: any) => (
  <StyledCode bold={bold}>{children}</StyledCode>
);

export const InlineCode = ({ children, bold = true }: any) => (
  <StyledCode bold={bold} inline>{children}</StyledCode>
);
