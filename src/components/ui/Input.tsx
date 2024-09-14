import { forwardRef, InputHTMLAttributes } from "react"

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
      return (
        <input
          className={`w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none ${className}`}
          ref={ref}
          {...props}
        />
      )
    }
  )
  Input.displayName = 'Input'