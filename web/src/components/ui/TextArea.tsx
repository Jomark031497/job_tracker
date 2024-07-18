import { forwardRef, TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  fieldError?: FieldError;
  containerClassName?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, fieldError, containerClassName, ...rest }, ref) => {
    return (
      <div className={twMerge("w-full", containerClassName)}>
        <label className="text-xs md:text-sm font-medium text-gray-500">
          {label}
          <textarea
            ref={ref}
            className={twMerge(
              "mt-1 block w-full transition-all outline-none rounded-lg border-2 bg-white/5 py-1.5 px-3 text-xs md:text-sm text-gray-500",
              "focus:border-accent hover:border-primary"
            )}
            rows={3}
            {...rest}
          />
        </label>
        {fieldError && <p className="text-red-500">{fieldError.message}</p>}
      </div>
    );
  }
);
