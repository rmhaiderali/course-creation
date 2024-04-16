import dynamic from "next/dynamic";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

// This line dynamically imports the Froala Editor component,
// and sets it to not load on the server (ssr: false)
// const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
//   ssr: false,
// });

const FroalaEditor = dynamic(
  () =>
    new Promise((resolve) =>
      import("froala-editor/js/plugins.pkgd.min.js").then((e) => {
        import("react-froala-wysiwyg").then(resolve);
      })
    ),
  { ssr: false }
);

function App() {
  const config = {
    // Set custom buttons.
    toolbarButtons: {
      // Key represents the more button from the toolbar.
      moreText: {
        // List of buttons used in the  group.
        buttons: [
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "fontFamily",
          "fontSize",
          "textColor",
          "backgroundColor",
          "inlineClass",
          "inlineStyle",
          "clearFormatting",
        ],
        align: "left",
        buttonsVisible: 3,
      },

      moreParagraph: {
        buttons: [
          "alignLeft",
          "alignCenter",
          "formatOLSimple",
          "formatULSimple",
          "alignRight",
          // "alignJustify",
          "paragraphFormat",
          "paragraphStyle",
          "lineHeight",
          "outdent",
          "indent",
          "quote",
        ],
        align: "left",
        buttonsVisible: 3,
      },

      moreRich: {
        buttons: ["insertLink", "insertImage", "emoticons"],
        align: "left",
        buttonsVisible: 3,
      },

      moreMisc: {
        buttons: [
          "undo",
          "redo",
          // "fullscreen",
          "print",
          // "getPDF",
          // "spellChecker",
          "selectAll",
          // "html",
          "help",
        ],
        align: "right",
        buttonsVisible: 2,
      },
    },
    quickInsertTags: [""],
    toolbarInline: true,
  };

  return (
    <div>
      <FroalaEditor config={config} />
      <FroalaEditor config={config} />
    </div>
  );
}

export default App;
