import { getTerminalValue, setTerminalValue } from "@/lib/utils";
import React from "react";
import { Editor, Element, Range, Transforms } from "slate";

export const onKeyDown = (event: React.KeyboardEvent, editor: Editor) => {
  const { selection } = editor;
  const [match] = Editor.nodes(editor, {
    match: (n: any) => n.type === "terminal",
  });
  if (selection && Range.isCollapsed(selection)) {
    const [start] = Range.edges(selection);
    const wordBefore = Editor.before(editor, start, { unit: "word" });
    const beforeRange = wordBefore && Editor.range(editor, wordBefore, start);
    const beforeText = beforeRange && Editor.string(editor, beforeRange);

    console.log(beforeText);

    if (beforeText?.startsWith("/")) {
      console.log(`Dentro de /: ${beforeText}`);

      if (!match) {
        Transforms.setNodes(
          editor,
          { type: "terminal", children: [{ text: "" }] },
          { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
        );
      }
    }
    if (event.key === "Enter" && match) {
      event.preventDefault();
      switch (beforeText) {
        case "code": {
          console.log("booa codigo");
          Transforms.removeNodes(editor, { at: beforeRange });
          Transforms.insertNodes(
            editor,
            { type: "code", children: [{ text: "" }] },
            { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
          );
          break;
        }
        default: {
          console.log("ai num vai da ne burrao");
          Transforms.setNodes(
            editor,
            { type: "plain", children: [{ text: "" }] },
            { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
          );
          break;
        }
      }
    }
  }
  if (event.key === "Enter" && !match) {
    event.preventDefault();
    Transforms.insertNodes(
      editor,
      { type: "plain", children: [{ text: "" }] },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  }
};
