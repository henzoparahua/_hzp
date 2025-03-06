import { RenderElementProps } from "slate-react";
import { CodeElement, PlainElement, TerminalElement } from "./ElementsTypes";
import { JSX } from "react";

// Custom Element Types:
export type CustomElement = {
  type: "" | "command" | "code" | "terminal" | "plain";
  children: CustomText[];
};

export type CustomText = {
  text: string;
};

export const Element = (
  props: RenderElementProps & { element: CustomElement }
): JSX.Element => {
  switch (props.element.type) {
    case "terminal":
      return <TerminalElement {...props} />;
    case "code":
      return <CodeElement {...props} />;
    case "plain":
      return <PlainElement {...props} />;
    default:
      return <PlainElement {...props} />;
  }
};
