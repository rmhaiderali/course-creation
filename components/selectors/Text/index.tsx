import { useNode, useEditor } from "@craftjs/core";
import React from "react";
import ContentEditable from "react-contenteditable";

import { TextSettings } from "./TextSettings";

// https://stackoverflow.com/questions/6906108/in-javascript-how-can-i-dynamically-get-a-nested-property-of-an-object
function setPropByString(obj, propString, value) {
  var prop,
    props = propString.split(".");

  for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
    prop = props[i];

    var candidate = obj[prop];
    if (candidate !== undefined) {
      obj = candidate;
    } else {
      break;
    }
  }
  obj[props[i]] = value;
}

export type TextProps = {
  fontSize: string;
  textAlign: string;
  fontWeight: string;
  color: Record<"r" | "g" | "b" | "a", string>;
  shadow: number;
  text: string;
  margin: [string, string, string, string];
  setme: string | string[];
};

export const Text = ({
  fontSize,
  textAlign,
  fontWeight,
  color,
  shadow,
  text,
  margin,
  setme = "text",
}: Partial<TextProps>) => {
  const {
    connectors: { connect },
    setProp,
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  return (
    <ContentEditable
      innerRef={connect}
      html={text} // innerHTML of the editable div
      disabled={!enabled}
      onChange={(e) => {
        setProp((prop) => {
          if (!Array.isArray(setme)) prop.text = e.target.value;
          else setPropByString(prop, setme.join("."), e.target.value);
        }, 500);
      }} // use true to disable editing
      tagName="h2" // Use a custom HTML tag (uses a div by default)
      style={{
        width: "100%",
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        color: `rgba(${Object.values(color)})`,
        fontSize: `${fontSize}px`,
        textShadow: `0px 0px 2px rgba(0,0,0,${(shadow || 0) / 100})`,
        fontWeight,
        textAlign,
        outline: "none",
      }}
    />
  );
};

Text.craft = {
  displayName: "Text",
  props: {
    fontSize: "15",
    textAlign: "left",
    fontWeight: "500",
    color: { r: 92, g: 90, b: 90, a: 1 },
    margin: [0, 0, 0, 0],
    shadow: 0,
    text: "Text",
  },
  related: {
    toolbar: TextSettings,
  },
};
