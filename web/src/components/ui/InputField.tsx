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
        <label className="text-xs font-medium text-gray-500 md:text-sm">
          {label}
          <input
            ref={ref}
            {...rest}
            className={twMerge(
              "mt-1 block w-full rounded-lg border-2 bg-white/5 px-3 py-1.5 text-xs text-gray-500 outline-none transition-all md:text-sm/6",
              "hover:border-primary focus:border-accent",
            )}
          />
        </label>
        {fieldError && <p className="text-sm text-red-500">{fieldError.message}</p>}
      </div>
    );
  },
);
