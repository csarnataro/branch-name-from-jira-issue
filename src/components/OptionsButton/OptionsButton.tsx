import React from "react";
import styled from "@emotion/styled";
import { Button } from "../Button/Button";

type OptionsButtonProps = {
  sectionLabel?: string;
  buttonLabel: string;
};

export const OptionsButton = ({ sectionLabel, buttonLabel }: OptionsButtonProps) => {
  return (
    <ButtonContainer>
      <ButtonLabel>
        <span>{sectionLabel}</span>
      </ButtonLabel>
      <Button type="submit">
        <span>{buttonLabel}</span>
      </Button>
    </ButtonContainer>

  );
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
