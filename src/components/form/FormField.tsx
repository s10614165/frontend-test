import * as React from "react"
import { Label } from "../ui/Label"
import { cn } from "../../lib/utils"

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  required?: boolean
  error?: string
  children: React.ReactNode
}

export function FormField({
  label,
  required,
  error,
  className,
  children,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {label && <Label required={required} className="text-[#9C0053] text-[16px] font-medium mb-[15px]">{label}</Label>}
      {children}
      {error && <p className="text-[14px] text-red-500 font-medium mt-2">{error}</p>}
    </div>
  )
}
