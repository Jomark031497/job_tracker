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
          "py-2 transition-all font-semibold rounded text-xs md:text-sm",
          rest.className,
          rest.disabled
            ? "bg-gray-300 text-white border-gray-300 hover:bg-gray-300"
            : "bg-accent text-white hover:bg-primary"
        )}
      >
        {children}
      </button>
    );
  }
);
