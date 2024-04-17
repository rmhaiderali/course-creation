import { Editor, Frame, Element } from "@craftjs/core";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";

import { Viewport, RenderNode } from "../components/editor";
import { Text } from "../components/selectors";
import { Container } from "../components/selectors/Container";
import { RowsContainer } from "../components/selectors/Container/rowsContainer";
import { ColumnsContainer } from "../components/selectors/Container/columnsContainer";
import { Button } from "../components/selectors/Button";
import { Custom1, OnlyButtons } from "../components/selectors/Custom1";
import { Custom2, Custom2VideoDrop } from "../components/selectors/Custom2";
import { Custom3, Custom3BtnDrop } from "../components/selectors/Custom3";
import { Video } from "../components/selectors/Video";
import { Image } from "../components/selectors/Image";
import { Poll } from "../components/selectors/Poll";
import { FroalaEditor } from "../components/selectors/FroalaEditor";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "acumin-pro",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="h-full h-screen">
        <Editor
          resolver={{
            Container,
            RowsContainer,
            ColumnsContainer,
            Text,
            Custom1,
            Custom2,
            Custom2VideoDrop,
            Custom3,
            Custom3BtnDrop,
            OnlyButtons,
            Button,
            Video,
            Image,
            Poll,
            FroalaEditor,
          }}
          enabled={false}
          onRender={RenderNode}
        >
          <Viewport>
            <Frame>
              <Element
                canvas
                is={Container}
                width="800px"
                height="auto"
                background={{ r: 255, g: 255, b: 255, a: 1 }}
                padding={["40", "40", "40", "40"]}
                custom={{ displayName: "App" }}
              ></Element>
            </Frame>
          </Viewport>
        </Editor>
      </div>
    </ThemeProvider>
  );
}

export default App;
