import { Element, useEditor } from "@craftjs/core";
import { Tooltip } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

import ButtonSvg from "../../../public/icons/toolbox/button.svg";
import SquareSvg from "../../../public/icons/toolbox/rectangle.svg";
import TypeSvg from "../../../public/icons/toolbox/text.svg";
import YoutubeSvg from "../../../public/icons/toolbox/video-line.svg";
import { Button } from "../../selectors/Button";
import { RowsContainer } from "../../selectors/Container/rowsContainer";
import { ColumnsContainer } from "../../selectors/Container/columnsContainer";
// import { Text } from "../../selectors/Text";
import { Video } from "../../selectors/Video";
import { Image } from "../../selectors/Image";
import { Poll } from "../../selectors/Poll";
import { FroalaEditor } from "components/selectors/FroalaEditor";

const ToolboxDiv = styled.div<{ enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => (!props.enabled ? `width: 0;` : "")}
  ${(props) => (!props.enabled ? `opacity: 0;` : "")}
`;

const Item = styled.a<{ move?: boolean }>`
  svg {
    width: 22px;
    height: 22px;
    fill: #707070;
  }
  ${(props) =>
    props.move &&
    `
    cursor: move;
  `}
`;

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => {
    return {
      enabled: state.options.enabled,
    };
  });

  return (
    <ToolboxDiv
      enabled={enabled && enabled}
      className="toolbox transition w-12 h-full flex flex-col bg-white"
    >
      <div className="flex flex-1 flex-col items-center pt-3">
        <div
          ref={(ref) =>
            create(
              ref,
              <Element
                canvas
                is={ColumnsContainer}
                background={{ r: 0, g: 0, b: 0, a: 0.1 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
                height="300px"
                width="300px"
              ></Element>
            )
          }
        >
          <Tooltip title="Columns Container" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <SquareSvg />
            </Item>
          </Tooltip>
        </div>
        <div
          ref={(ref) =>
            create(
              ref,
              <Element
                canvas
                is={RowsContainer}
                background={{ r: 0, g: 0, b: 0, a: 0.1 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
                height="300px"
                width="300px"
              ></Element>
            )
          }
        >
          <Tooltip title="Rows Container" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <SquareSvg />
            </Item>
          </Tooltip>
        </div>
        {/* <div
          ref={(ref) =>
            create(ref, <Text fontSize="12" textAlign="left" text="Hi there" />)
          }
        >
          <Tooltip title="Text" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <TypeSvg />
            </Item>
          </Tooltip>
        </div> */}
        <div ref={(ref) => create(ref, <FroalaEditor />)}>
          <Tooltip title="Text" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <TypeSvg />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <Button />)}>
          <Tooltip title="Button" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <ButtonSvg />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <Video />)}>
          <Tooltip title="Video" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <YoutubeSvg />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <Image />)}>
          <Tooltip title="Image" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <YoutubeSvg />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <Poll />)}>
          <Tooltip title="Poll" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <YoutubeSvg />
            </Item>
          </Tooltip>
        </div>
      </div>
    </ToolboxDiv>
  );
};
