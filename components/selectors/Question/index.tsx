import { UserComponent, useNode, useEditor } from "@craftjs/core";
import cx from "classnames";
import React from "react";
import styled from "styled-components";

import { QuestionSettings } from "./QuestionSettings";

import { Text } from "../Text";

type ButtonProps = {
  background?: Record<"r" | "g" | "b" | "a", number>;
  color?: Record<"r" | "g" | "b" | "a", number>;
  buttonStyle?: string;
  margin?: any[];
  text?: string;
  textComponent?: any;
  options?: string[];
};

const StyledButton = styled.button<ButtonProps>`
  background: ${(props) =>
    props.buttonStyle === "full"
      ? `rgba(${Object.values(props.background)})`
      : "transparent"};
  border: 2px solid transparent;
  border-color: ${(props) =>
    props.buttonStyle === "outline"
      ? `rgba(${Object.values(props.background)})`
      : "transparent"};
  margin: ${({ margin }) =>
    `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`};
  display: flex;
  align-items: center;
`;

export const Question: UserComponent<ButtonProps> = (props: any) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const { text, textComponent, color, options, ...otherProps } = props;
  return (
    <div ref={connect}>
      <Text {...textComponent} text={text} />
      {options.map((option, index) => (
        <StyledButton
          className={cx([
            "rounded w-full px-4 py-2",
            {
              "shadow-lg": props.buttonStyle === "full",
            },
          ])}
          {...otherProps}
          onClick={(e) => {
            if (!enabled) e.currentTarget.querySelector("input").checked = true;
          }}
        >
          <input
            type="radio"
            style={{ marginRight: "15px" }}
            name={text.replaceAll(" ", "")}
            value={index}
            disabled={enabled}
          />
          <Text
            {...textComponent}
            text={option}
            color={props.color}
            setme={["options", index]}
          />
        </StyledButton>
      ))}
    </div>
  );
};

Question.craft = {
  displayName: "Question",
  props: {
    background: { r: 169, g: 230, b: 255, a: 1 },
    color: { r: 92, g: 90, b: 90, a: 1 },
    buttonStyle: "full",
    text: "Type Question",
    margin: ["5", "0", "5", "0"],
    textComponent: {
      ...Text.craft.props,
      textAlign: "center",
    },
    options: ["Option 1", "Option 2", "Option 3"],
  },
  related: {
    toolbar: QuestionSettings,
  },
};
