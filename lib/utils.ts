import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getCursorPosition = () => {
  const selectionval = window.getSelection();
  const range = selectionval!.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  return { x: rect.x, y: rect.y + window.scrollY };
};

export default getCursorPosition;

let terminalAction = "";

export function getTerminalValue() {
  return terminalAction;
}
export function setTerminalValue(newValue) {
  terminalAction = newValue;
  return;
}
