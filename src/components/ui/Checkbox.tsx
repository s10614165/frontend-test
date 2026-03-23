import * as React from "react"
import { cn } from "../../lib/utils"

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
  checkedColor?: string;
  borderColor?: string;
  checkIconColor?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      error,
      checkedColor = "#9C0053",
      borderColor = "#ECD7E2",
      checkIconColor = "#FFFFFF",
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div 
        className={cn("relative flex items-center justify-center h-4 w-4 shrink-0", className)}
        style={{
          '--checkbox-checked-color': checkedColor,
          '--checkbox-border-color': error ? '#ef4444' : borderColor,
          '--checkbox-check-color': checkIconColor,
          ...style,
        } as React.CSSProperties}
      >
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "peer absolute m-0 h-full w-full appearance-none rounded border-[1.5px] border-[var(--checkbox-border-color)] bg-transparent cursor-pointer disabled:opacity-50 outline-none transition-all",
            "checked:border-[var(--checkbox-checked-color)] checked:bg-[var(--checkbox-checked-color)]",
            "focus-visible:ring-2 focus-visible:ring-[var(--checkbox-checked-color)] focus-visible:ring-offset-2"
          )}
          {...props}
        />
        <svg
          className="absolute w-3 h-3 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--checkbox-check-color)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
