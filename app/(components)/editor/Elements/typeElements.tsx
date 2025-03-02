import { JSX, useCallback } from "react";
import CodeElement from "./codeElement";
import PlainElement from "./plainElement";

export const renderElement = useCallback((props: any): JSX.Element => {
  switch (props.element.type) {
    case "code":
      return <CodeElement {...props} />;
    default:
      return <PlainElement {...props} />;
  }
}, []);
