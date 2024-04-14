import { useNode, useEditor } from "@craftjs/core";
import React from "react";
import styled from "styled-components";

import { ImageSettings } from "./ImageSettings";

const Wrapper = styled.div<any>`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Image = (props: any) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const { imageUrl } = props;

  return (
    <Wrapper ref={connect} enabled={enabled}>
      <img src={imageUrl} />
    </Wrapper>
  );
};

Image.craft = {
  displayName: "Image",
  props: {
    imageUrl: "/placeholder/image.png",
  },
  related: {
    toolbar: ImageSettings,
  },
};
