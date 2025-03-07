import { getTerminalValue, setTerminalValue } from "@/lib/utils";
import React from "react";
import { Editor, Element, Range, Transforms } from "slate";

export const onKeyDown = (event: React.KeyboardEvent, editor: Editor) => {
  const { selection } = editor;
  if (selection && Range.isCollapsed(selection)) {
    const [start] = Range.edges(selection);
    const wordBefore = Editor.before(editor, start, { unit: "word" });
    const beforeRange = wordBefore && Editor.range(editor, wordBefore, start);
    const beforeText = beforeRange && Editor.string(editor, beforeRange);

    if (beforeText?.startsWith("/")) {
      console.log(`Dentro de /: ${beforeText}`);
      const [match] = Editor.nodes(editor, {
        match: (n: any) => n.type === "terminal",
      });
      if (!match) {
        console.log(`não é um terminal mas agora vai virar`);
        Transforms.setNodes(
          editor,
          { type: "terminal", children: [{ text: "" }] },
          { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
        );
      }
    }
  }
  if (event.key === "Enter") {
    event.preventDefault();
    Transforms.insertNodes(
      editor,
      { type: "plain", children: [{ text: "" }] },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  }
};
