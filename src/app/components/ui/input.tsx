"use client";

import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  rows?: number;
};

export const Textarea: React.FC<TextareaProps> = ({ className, rows = 3, ...props }) => {
  return (
    <textarea
      rows={rows}
      className={`w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${className || ""}`}
      {...props}
    />
  );
};

export default Textarea;
