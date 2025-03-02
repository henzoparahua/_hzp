"use client";
import { JSX, useCallback, useMemo, useState } from "react";
import { createEditor, Editor, Element, Range, Transforms } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import PlainElement from "./Elements/plainElement";
import CodeElement from "./Elements/codeElement";
import SuggestionMenu from "./CommandsMenu/suggestionMenu";
import getCursorPosition from "@/lib/utils";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  /** RenderElement starts here */
  const renderElement = useCallback((props: any): JSX.Element => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <PlainElement {...props} />;
    }
  }, []);

  /** Editor handleKeyDown Commands */
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "/") {
      event.preventDefault();
      setShowMenu(true);
      setMenuPosition(getCursorPosition());
    }
    if (event.key === "Escape" && showMenu) {
      event.preventDefault();
      console.log("ive tried");
      setShowMenu(false);
    }

    if (event.key === "e" && event.ctrlKey) {
      event.preventDefault();
      const [match] = Editor.nodes(editor, {
        match: (n: any) => n.type === "code",
      });

      Transforms.setNodes(
        editor,
        { type: match ? "plain" : "code" },
        {
          match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
        }
      );
    }
  };

  /** Handle Commands */
  const [value, setValue] = useState([
    { type: "paragraph", children: [{ text: "" }] },
  ]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleCommandSelect = (command: string) => {
    switch (command) {
      case "nslookup":
        editor.insertNode({
          type: "code",
          children: [{ text: "Text" }],
        });
        break;
      default:
        break;
    }
  };

  /** Starting main element editor of Slate-js*/
  return (
    <main className="flex min-h-screen  py-4 px-4 md:py-8 md:px-16 ">
      {/*Article and main stuff just to prevent text from disapearing from the screen and other not cool stuffs.*/}
      <article className="flex w-full flex-col ">
        {/* Editor */}
        <Slate editor={editor} initialValue={initialValue}>
          <Editable
            autoFocus
            className="h-full w-full space-y-3 md:p-8 "
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
            renderElement={renderElement}
            onKeyDown={handleKeyDown}
          />
          {showMenu && (
            <SuggestionMenu
              position={menuPosition}
              onSelect={handleCommandSelect}
            />
          )}
        </Slate>
      </article>
    </main>
  );
};

export default App;
