import React from 'react';
import Button from '../Button';
import { ButtonContainer, ButtonLabel } from './OptionsButton.styled';

type OptionsButtonProps = {
  sectionLabel?: string;
  buttonLabel: string;
  onClick: () => void;
};

const OptionsButton = ({ sectionLabel, buttonLabel, onClick }: OptionsButtonProps) => (
  <ButtonContainer>
    <ButtonLabel>
      <span>{sectionLabel}</span>
    </ButtonLabel>
    <Button onClick={onClick}>
      <span>{buttonLabel}</span>
    </Button>
  </ButtonContainer>

);

OptionsButton.defaultProps = {
  sectionLabel: '',
};

export default OptionsButton;
