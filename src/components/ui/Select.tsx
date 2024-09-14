import React from "react"
import { ButtonHTMLAttributes, forwardRef, SelectHTMLAttributes } from "react"

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
    ({ children, ...props }, ref) => {
      return (
        <div className="relative">
          <select
            ref={ref}
            className="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            {...props}
          >
            {children}
          </select>
        </div>
      )
    }
  )
  Select.displayName = 'Select'

  export const SelectTrigger = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, children, ...props }, ref) => {
      return (
        <button
          type="button"
          ref={ref}
          className={`flex items-center justify-between w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${className}`}
          {...props}
        >
          {children}
          <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )
    }
  )
  SelectTrigger.displayName = 'SelectTrigger'
  
  export const SelectContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
      return (
        <div
          ref={ref}
          className={`absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg ${className}`}
          {...props}
        >
          {children}
        </div>
      )
    }
  )
  SelectContent.displayName = 'SelectContent'
  
  export const SelectItem = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
      return (
        <div
          ref={ref}
          className={`px-3 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 ${className}`}
          {...props}
        >
          {children}
        </div>
      )
    }
  )
  SelectItem.displayName = 'SelectItem'
  
  export const SelectValue = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    ({ className, ...props }:any, ref) => {
      return <span ref={ref} className={`block truncate ${className}`} {...props} />
    }
  )
  SelectValue.displayName = 'SelectValue'