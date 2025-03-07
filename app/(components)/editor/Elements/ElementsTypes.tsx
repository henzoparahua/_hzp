import { cn, getTerminalValue, setTerminalValue } from "@/lib/utils";
import { RenderElementProps, useSelected } from "slate-react";
import { CustomElement } from "./RenderElements";
import React, { useState } from "react";
import { Text } from "slate";

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

  return (
    <div {...props.attributes}>
      <p className="">
        <span className="bg-neutral-400 p-1 text-base terminalElement">
          {props.children}
        </span>
      </p>
    </div>
  );
};
