import { forwardRef, SelectHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  containerClassName?: string;
  fieldError?: FieldError;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, containerClassName, fieldError, ...rest }, ref) => {
    return (
      <div className={containerClassName}>
        <label className="text-xs font-medium text-gray-500 md:text-sm">
          {label}
          <select
            ref={ref}
            {...rest}
            className={twMerge(
              "mt-1 block w-full rounded-lg border-2 bg-white/5 px-3 py-1.5 text-xs text-gray-500 outline-none transition-all md:text-sm/6",
              "hover:border-primary focus:border-accent",
            )}
          />
        </label>
        {fieldError && <p className="text-red-500">{fieldError.message}</p>}
      </div>
    );
  },
);
