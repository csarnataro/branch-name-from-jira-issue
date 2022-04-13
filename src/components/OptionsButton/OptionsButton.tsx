import React from 'react';
import Button from '../Button';
import { ButtonContainer, ButtonLabel } from './OptionsButton.styled';

type OptionsButtonProps = {
  sectionLabel?: string;
  buttonLabel: string;
};

const OptionsButton = ({ sectionLabel, buttonLabel }: OptionsButtonProps) => (
  <ButtonContainer>
    <ButtonLabel>
      <span>{sectionLabel}</span>
    </ButtonLabel>
    <Button type="submit">
      <span>{buttonLabel}</span>
    </Button>
  </ButtonContainer>

);

OptionsButton.defaultProps = {
  sectionLabel: '',
};

export default OptionsButton;
