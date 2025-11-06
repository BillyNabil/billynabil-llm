"use client";

import React from "react";

type SelectOption = { value: string; label: React.ReactNode };

type SelectProps = React.HTMLAttributes<HTMLDivElement> & {
  options: SelectOption[];
  onSelect: (value: string) => void;
  value?: string;
};

export const Select: React.FC<SelectProps> = ({ options, onSelect, value, className }) => {
  return (
    <div className={`relative ${className || ""}`}>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`w-full text-left px-4 py-3 transition-all duration-150 ${value === opt.value ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;
