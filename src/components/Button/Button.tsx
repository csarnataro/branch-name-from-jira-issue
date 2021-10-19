import React from 'react';
import StyledButton from './Button.styled';

const Button = ({ children, ...rest }: any) => (
  <StyledButton {...rest}>
    {children}
  </StyledButton>
);

export default Button;
