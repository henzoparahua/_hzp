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
      const [match] = Editor.nodes(editor, {
        match: (n) => n.type === "prompt",
      });

      Transforms.setNodes(
        editor,
        { type: "prompt", children: [{ text: "" }] },
        { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
      );
    }

    // Check if the current node is a "prompt" node
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "prompt",
    });

    if (match) {
      const [node, path] = match;

      switch (event.key) {
        case "Enter": {
          event.preventDefault();

          // Capture the text from the "prompt" node
          const promptText = Editor.string(editor, path);

          // Extract the domain value (e.g., from a format like "/command domain:example.com")
          const domainMatch = promptText.match(/domain:([^\s]+)/);
          const domain = domainMatch ? domainMatch[1] : undefined;

          // Insert a new "terminal" node below the "prompt" node
          Transforms.insertNodes(
            editor,
            {
              type: "terminal",
              domain, // Pass the domain value
              children: [
                { text: domain ? `Domain: ${domain}` : "No domain specified" },
              ],
            },
            { at: [path[0] + 1] } // Insert after the current node
          );

          // Clear the "prompt" node
          Transforms.delete(editor, { at: path });

          break;
        }

        default:
          break;
      }
    }
  }
};
