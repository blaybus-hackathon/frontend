import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, type = "text", placeholder, label, maxLength, width, ...props }, ref) => {

    const widthStyle = width ? { width: width } : { width: '16rem' };

    return (
      <div className={`relative`} style={widthStyle}>
        {label && (
          <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {label}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          className={cn(
            "w-full rounded-xs bg-background h-10 border border-input px-3",
            label ? "pl-9" : "pl-4",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
