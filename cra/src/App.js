import React from "react";
import { useNode, Editor, Frame, Canvas } from "@craftjs/core";

const TextComponent = ({ text }) => {
  const {
    connectors: { drag },
  } = useNode();

  return (
    <div ref={drag}>
      <h2>{text}</h2>
    </div>
  );
};

const Container = ({ children }) => {
  return (
    <div style={{ border: "1px dashed gray", padding: "10px" }}>{children}</div>
  );
};

const App = () => {
  return (
    <div>
      <header>Some fancy header or whatever</header>
      <Editor>
        <Frame
          resolver={{
            TextComponent,
            Container,
            Canvas,
          }}
        >
          <Canvas>
            <Container>
              <TextComponent text="I'm already rendered here" />
            </Container>
          </Canvas>
        </Frame>
      </Editor>
    </div>
  );
};

export default App;
