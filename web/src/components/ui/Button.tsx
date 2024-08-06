import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, isLoading, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      {...rest}
      className={twMerge(
        "rounded bg-accent py-2 text-xs font-semibold text-white transition-all hover:bg-primary md:text-sm",
        rest.className,
        rest.disabled ? "border-gray-300 bg-gray-300 text-white hover:bg-gray-300" : "",
      )}
    >
      {children}
    </button>
  );
});
