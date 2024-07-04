import { InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fieldError?: FieldError;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, fieldError, ...rest }, ref) => {
    return (
      <div>
        <label className="flex flex-col gap-1 text-sm font-semibold text-gray-500">
          {label}
          <input
            ref={ref}
            {...rest}
            className="outline-none border rounded py-1.5 px-2 tracking-wider"
          />
        </label>
        {fieldError && <p className="text-red-500">{fieldError.message}</p>}
      </div>
    );
  }
);
