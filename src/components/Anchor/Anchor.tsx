import React from 'react';
import StyledAnchor from './Anchor.styled';

const Anchor = ({ children, ...rest }: any) => (
  <StyledAnchor {...rest}>
    {children}
  </StyledAnchor>
);

export default Anchor;
