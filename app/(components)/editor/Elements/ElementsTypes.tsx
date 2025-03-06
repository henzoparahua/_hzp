import { cn, getTerminalValue, setTerminalValue } from "@/lib/utils";
import { RenderElementProps, useSelected } from "slate-react";
import { CustomElement } from "./RenderElements";
import React, { useState } from "react";

export const PlainElement = (
  props: RenderElementProps & { element: CustomElement }
) => {
  return (
    <div className={cn(useSelected() ? "plainElement" : null)}>
      <p {...props.attributes}>{props.children}</p>
    </div>
  );
};

export const CodeElement = (
  props: RenderElementProps & { element: CustomElement }
) => {
  return (
    <div className={(cn(useSelected() ? "plainElement" : null), "codeElement")}>
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    </div>
  );
};

export const TerminalElement = (
  props: RenderElementProps & { element: CustomElement }
) => {
  const [terminalAction, setTerminalAction] = useState("");
  setTerminalValue(terminalAction);
  console.log(getTerminalValue());
  return (
    <div {...props.attributes} contentEditable={false}>
      <p className="terminalElement font-mono font-medium">
        {props.children}
        <input
          type="text"
          className="bg-red-500"
          value={terminalAction}
          onChange={(e) => {
            setTerminalAction(e.target.value);
          }}
        />
      </p>
    </div>
  );
};
