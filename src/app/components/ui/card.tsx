"use client";

import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "ghost" | "primary";
};

export const Card: React.FC<CardProps> = ({
  variant = "default",
  className,
  children,
  ...props
}) => {
  const base = "rounded-2xl p-4 transition-all duration-150";

  const variants: Record<string, string> = {
    default: "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-sm",
    ghost: "bg-transparent border border-transparent",
    primary: "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md",
  };

  return (
    <div className={`${base} ${variants[variant]} ${className || ""}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
