import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
        className={twMerge(
          "py-2 transition-all font-semibold rounded",
          rest.disabled ? "bg-gray-200 text-white" : "bg-accent text-white hover:bg-primary",
          rest.className
        )}
      >
        {children}
      </button>
    );
  }
);
