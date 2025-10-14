import React from "react";
import clsx from "clsx"; // optional utility (like cn), install with: npm install clsx

export const Input = React.forwardRef(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={clsx(
          "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-6 text-base",
          "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34A7D5] focus:border-[#34A7D5]",
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
