import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-textMuted">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          "glass-input placeholder:text-textMuted/50",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export { Input };
