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
        <label className="text-xs font-medium text-gray-500 md:text-sm">
          {label}
          <textarea
            ref={ref}
            className={twMerge(
              "mt-1 block w-full rounded-lg border-2 bg-white/5 px-3 py-1.5 text-xs text-gray-500 outline-none transition-all md:text-sm",
              "hover:border-primary focus:border-accent",
            )}
            rows={3}
            {...rest}
          />
        </label>
        {fieldError && <p className="text-red-500">{fieldError.message}</p>}
      </div>
    );
  },
);
