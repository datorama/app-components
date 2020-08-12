import React, { Component, ReactNode } from "react";
import styled from "styled-components";

interface ClickOutProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

class ClickOut extends Component<ClickOutProps> {
  element: HTMLElement | undefined;

  componentDidMount() {
    // @ts-ignore
    window.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    // @ts-ignore
    window.removeEventListener("click", this.handleClick);
  }

  handleClick = (event: React.MouseEvent<Window, MouseEvent>) => {
    const { onClick } = this.props;

    // @ts-ignore
    if (this.element && !this.element.contains(event.target)) {
      if (onClick) {
        onClick();
      }
    }
  };

  handleRef = (element: HTMLElement | null) => {
    if (element) {
      this.element = element;
    }
  };

  render() {
    const { className } = this.props;

    return (
      <Relative ref={this.handleRef} className={className}>
        {this.props.children}
      </Relative>
    );
  }
}

const Relative = styled.div`
  position: relative;
`;

export default ClickOut;
