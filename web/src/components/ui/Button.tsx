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
        "rounded py-2 text-xs font-semibold transition-all md:text-sm",
        rest.className,
        rest.disabled
          ? "border-gray-300 bg-gray-300 text-white hover:bg-gray-300"
          : "bg-accent text-white hover:bg-primary",
      )}
    >
      {children}
    </button>
  );
});
