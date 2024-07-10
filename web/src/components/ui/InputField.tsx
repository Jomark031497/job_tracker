import { Field, Input, Label } from "@headlessui/react";
import { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fieldError?: FieldError;
}

export const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ label, fieldError, ...rest }, ref) => {
    return (
      <div className="w-full">
        <Field>
          <Label className="text-sm/6 font-medium text-gray-500">{label}</Label>
          <Input
            ref={ref}
            {...rest}
            className={twMerge(
              "mt-1 block w-full transition-all outline-none rounded-lg border-2 bg-white/5 py-1.5 px-3 text-sm/6 text-black",
              "focus:border-accent hover:border-primary"
            )}
          />
        </Field>
        {fieldError && <p className="text-red-500">{fieldError.message}</p>}
      </div>
    );
  }
);

// ({ label, fieldError, ...rest }: InputProps) => {
//   return (

//   );
// };
