import { useNode, useEditor } from "@craftjs/core";
import styled from "styled-components";

import { ReactQuillSettings } from "./ReactQuillSettings";

import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const Wrapper = styled.div<any>`
  width: 100%;
  .ql-toolbar {
    border: none !important;
    ${(props) => (props.enabled ? "" : "display: none;")}
    ${(props) =>
      props.enabled ? "border-bottom: 1px solid #ccc !important;" : ""}
  }
  .ql-container {
    border: none !important;
  }
`;

export const ReactQuill = (props: any) => {
  const { content } = props;

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const {
    connectors: { connect },
    active,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
    active: node.events.selected,
  }));

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  console.log(quillModules);

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  return (
    <Wrapper ref={connect} enabled={active && enabled}>
      <QuillEditor
        readOnly={!enabled}
        value={content}
        onChange={(newContent) =>
          setProp((prop) => (prop.content = newContent), 500)
        }
        modules={quillModules}
        formats={quillFormats}
        placeholder="Type text here"
        className="w-full"
      />
    </Wrapper>
  );
};

ReactQuill.craft = {
  displayName: "Text",
  props: {
    content: "",
  },
  related: {
    toolbar: ReactQuillSettings,
  },
};
