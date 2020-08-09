import React, { ReactNode } from "react";
import styled from "styled-components";

import Button from "packages/core/Button";

export enum ButtonType {
  Secondary = "secondary",
  Primary = "primary",
}

export type ButtonObject = {
  type?: ButtonType;
  isDisabled?: boolean;
  onClick: () => void;
  label: string;
};

export type ButtonRenderer = ({ key }: { key: string; }) => ReactNode;

interface ModalFooter {
  buttons?: (ButtonObject | ButtonRenderer)[];
  handleClick: (onClick: Function) => () => void;
}

const ModalFooter: Function = ({ buttons = [], handleClick }: ModalFooter): ReactNode[] | null => {
  if (!buttons.length) return null;

  return buttons.map((button: ButtonObject | ButtonRenderer, index: number) => {
    if (typeof button === "function") {
      return button({ key: `btn-${index}` });
    }

    return (
      <StyledButton
        className="modal modal-footer modal-footer-button"
        key={`btn-${index}`}
        isSecondary={button.type === ButtonType.Secondary}
        isDisabled={button.isDisabled}
        onClick={handleClick(button.onClick)}
      >
        {button.label}
      </StyledButton>
    );
  });
};

const StyledButton = styled(Button)`
  margin-left: 10px;
`;

export default ModalFooter;
