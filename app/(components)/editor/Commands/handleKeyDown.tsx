import React, { useState } from "react";
import { Editor, EditorMarks, Element, Range, Transforms } from "slate";

export const onKeyDown = (
  event: React.KeyboardEvent,
  editor: Editor,
  setValue: any
) => {
  const { selection } = editor;
  if (selection && Range.isCollapsed(selection)) {
    const [start] = Range.edges(selection);
    const wordBefore = Editor.before(editor, start, { unit: "word" });
    const beforeRange = wordBefore && Editor.range(editor, wordBefore, start);
    const beforeText = beforeRange && Editor.string(editor, beforeRange);

    if (beforeText?.startsWith("/")) {
      const [match] = Editor.nodes(editor, {
        match: (n: any) => n.type === "terminal",
      });

      Transforms.setNodes(
        editor,
        { type: "terminal", children: [{ text: "" }] },
        { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
      );
    }

    // Check if the current node is a "prompt" node
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.type === "terminal",
    });
  }
};
