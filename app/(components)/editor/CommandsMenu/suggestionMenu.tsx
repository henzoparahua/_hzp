import React from "react";

const SuggestionMenu = ({ position, onSelect }) => {
  const commands = [{ label: "code", value: "nslookup" }];

  return (
    <div
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        background: "white",
        border: "1px solid #ddd",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      {commands.map((command) => (
        <div
          key={command.value}
          onClick={() => onSelect(command.value)}
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          {command.label}
        </div>
      ))}
    </div>
  );
};

export default SuggestionMenu;
