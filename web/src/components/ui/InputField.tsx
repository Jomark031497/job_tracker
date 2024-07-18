import { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fieldError?: FieldError;
  containerClassName?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ label, fieldError, containerClassName, ...rest }, ref) => {
    return (
      <div className={containerClassName}>
        <label className="text-xs md:text-sm font-medium text-gray-500">
          {label}
          <input
            ref={ref}
            {...rest}
            className={twMerge(
              "mt-1 block w-full transition-all outline-none rounded-lg text-xs border-2 bg-white/5 text-gray-500 py-1.5 px-3 md:text-sm/6",
              "focus:border-accent hover:border-primary"
            )}
          />
        </label>
        {fieldError && <p className="text-red-500 text-sm">{fieldError.message}</p>}
      </div>
    );
  }
);
