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
        <label className="text-sm/6 font-medium text-gray-500">
          {label}
          <select
            ref={ref}
            {...rest}
            className={twMerge(
              "mt-1 block w-full h-10 transition-all outline-none rounded-lg border-2 bg-white/5 py-2 px-3 text-sm/6 text-black",
              "focus:border-accent hover:border-primary"
            )}
          />
        </label>
        {fieldError && <p className="text-red-500">{fieldError.message}</p>}
      </div>
    );
  }
);
