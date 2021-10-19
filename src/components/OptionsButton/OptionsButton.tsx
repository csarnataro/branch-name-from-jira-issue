import React from 'react';
import styled from '@emotion/styled';
import Button from '../Button';

type OptionsButtonProps = {
  sectionLabel?: string;
  buttonLabel: string;
};

const ButtonLabel = styled.label`
  flex: 1 0 150px;
  max-width: 300px;
`;

const ButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

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
