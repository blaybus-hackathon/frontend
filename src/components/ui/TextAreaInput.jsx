import * as React from "react"
import { cn } from "@/lib/utils"

const TextAreaInput = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <textarea
            {...props}
            ref={ref}
            className={cn(
                "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                "h-20 resize-none",
                "placeholder:text-gray-400 placeholder:select-none placeholder:text-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                className
            )}
        />
    )
})
TextAreaInput.displayName = "TextAreaInput"

export { TextAreaInput }