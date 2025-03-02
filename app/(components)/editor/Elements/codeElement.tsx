import { cn } from "@/lib/utils";
import { RenderElementProps, useSelected } from "slate-react";

const CodeElement = (props: RenderElementProps) => {
  return (
    <div className={(cn(useSelected() ? "plainElement" : null), "codeElement")}>
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    </div>
  );
};

export default CodeElement;
