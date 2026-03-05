import React, { useState } from "react";

const COLORS = [
  "#e11d48",
  "#f472b6",
  "#fb923c",
  "#facc15",
  "#84cc16",
  "#10b981",
  "#0ea5e9",
  "#3b82f6",
  "#8b5cf6",
  "#a78bfa",
];

interface ColorSelectorProps {
  onChange: (color: string) => void;
  currentColor?: string;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ onChange, currentColor }) => {
  return (
    <div className="flex flex-wrap gap-2 p-2">
      {COLORS.map((c) => (
        <button
          key={c}
          className="w-6 h-6 rounded-full border-2 border-white/60"
          style={{ backgroundColor: c }}
          aria-label={c}
          onClick={() => onChange(c)}
        >
          {currentColor === c && (
            <span className="block w-full h-full bg-white/50 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default ColorSelector;
