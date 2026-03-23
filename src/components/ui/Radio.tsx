import * as React from "react"
import { cn } from "../../lib/utils"

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
  checkedColor?: string;
  borderColor?: string;
  checkIconColor?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      error,
      checkedColor = "#9C0053",
      borderColor = "#ECD7E2",
      checkIconColor = "#9C0053",
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div 
        className={cn("relative flex items-center justify-center h-4 w-4 shrink-0", className)}
        style={{
          '--radio-checked-color': checkedColor,
          '--radio-border-color': error ? '#ef4444' : borderColor,
          '--radio-check-color': checkIconColor,
          ...style,
        } as React.CSSProperties}
      >
        <input
          type="radio"
          ref={ref}
          className={cn(
            "peer absolute m-0 h-full w-full appearance-none rounded-full border-[1.5px] border-[var(--radio-border-color)] bg-transparent cursor-pointer disabled:opacity-50 outline-none transition-all",
            "checked:border-[var(--radio-checked-color)]",
            "focus-visible:ring-2 focus-visible:ring-[var(--radio-checked-color)] focus-visible:ring-offset-2"
          )}
          {...props}
        />
        <svg
          className="absolute w-2 h-2 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
          viewBox="0 0 24 24"
          fill="var(--radio-check-color)"
        >
          <circle cx="12" cy="12" r="12"></circle>
        </svg>
      </div>
    )
  }
)
Radio.displayName = "Radio"

export { Radio }
