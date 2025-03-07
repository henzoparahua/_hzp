"use client";
import React, { useCallback, useState } from "react";
import { createEditor, Editor, Range } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { CustomElement, Element } from "./Elements/RenderElements";
import { onKeyDown } from "./Commands/handleKeyDown";

const initialValue: CustomElement[] = [
  {
    type: "plain",
    children: [{ text: "" }],
  },
];

const App = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState(initialValue);

  const renderElementCall = useCallback(Element, []);

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
            placeholder="Type somethig below"
          />
        </Slate>
      </article>
    </main>
  );
};

export default App;
