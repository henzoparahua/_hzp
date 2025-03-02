import { cn } from "@/lib/utils";
import { RenderElementProps, useSelected } from "slate-react";

const PlainElement = (props: RenderElementProps) => {
  return (
    <div className={cn(useSelected() ? "plainElement" : null)}>
      <p {...props.attributes}>{props.children}</p>
    </div>
  );
};

export default PlainElement;
