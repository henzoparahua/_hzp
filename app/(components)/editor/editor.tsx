"use client";
import React, { useCallback, useState } from "react";
import { createEditor, Editor, Range } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { CustomElement, renderElement } from "./Elements/RenderElements";
import { onKeyDown } from "./Commands/handleKeyDown";

const initialValue: CustomElement[] = [
  {
    type: "plainElement",
    children: [{ text: "" }],
  },
];

const App = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState(initialValue);

  const renderElementCall = useCallback(renderElement, []);

  const onKeyDownCall = useCallback(
    (event: React.KeyboardEvent) => onKeyDown(event, editor),
    [editor]
  );

  return (
    <main className="flex min-h-screen py-4 px-4 md:py-8 md:px-16">
      <article className="flex w-full flex-col">
        <Slate
          editor={editor}
          initialValue={value}
          onChange={() => setValue(value)}
        >
          <Editable
            renderElement={renderElementCall}
            onKeyDown={onKeyDownCall}
            autoFocus
            className="h-full w-full space-y-3 md:p-8 slate-editor"
            decorate={([node, path]) => {
              if (editor.selection != null) {
                !Editor.isEditor(node) &&
                  Editor.string(editor, [path[0]]) === "" &&
                  Range.includes(editor.selection, path) &&
                  Range.isCollapsed(editor.selection);
                {
                  return [
                    {
                      ...editor.selection,
                      placeholder: true,
                    },
                  ];
                }
              }
              return [];
            }}
          />
        </Slate>
      </article>
    </main>
  );
};

export default App;
