import React from "react";
import clsx from "clsx"; // same as we used for Input

export const Label = React.forwardRef(({ className, required, children, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={clsx(
        "block text-sm font-medium text-[#626262] mb-2 select-none",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
});

Label.displayName = "Label";
