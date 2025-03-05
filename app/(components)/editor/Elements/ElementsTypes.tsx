import { cn } from "@/lib/utils";
import { RenderElementProps, useSelected } from "slate-react";
import { CustomElement } from "./RenderElements";

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
  const { element } = props;

  return (
    <div {...props.attributes}>
      {element.domain ? `Domain: ${element.domain}` : props.children}
    </div>
  );
};
