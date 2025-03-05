import { RenderElementProps } from "slate-react";
import { CodeElement, PlainElement, TerminalElement } from "./ElementsTypes";
import { JSX } from "react";

// Custom Element Types:
export type CustomElement = {
  type: "" | "command" | "code" | "prompt" | "plainElement";
  domain?: CustomText[];
  children: CustomText[];
};

export type CustomText = {
  text: string;
};

export const renderElement = (
  props: RenderElementProps & { element: CustomElement }
): JSX.Element => {
  switch (props.element.type) {
    case "prompt":
      return <TerminalElement {...props} />;
    case "code":
      return <CodeElement {...props} />;
    case "plainElement":
      return <PlainElement {...props} />;
    default:
      return <PlainElement {...props} />;
  }
};
