import React from "react";
import { useNode, Editor, Element } from "@craftjs/core";

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
      <Editor
        resolver={{
          TextComponent,
          Container,
          Element, // Include Element in the resolver configuration
        }}
      >
        {/* Use Element canvas={true} instead of Canvas */}
        <Element canvas={true}>
          <Container>
            <TextComponent text="I'm already rendered here" />
          </Container>
        </Element>
      </Editor>
    </div>
  );
};

export default App;
